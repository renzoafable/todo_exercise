const knex = require('./connection');

async function findUserByEmail(email) {
  const user = await knex('users').where({ email }).returning('*').first('*');

  return user;
}

async function createForOrganization({ user, userRoleId, organizationId }) {
  const trx = await knex.transaction();

  try {
    const [createdUser] = await trx('users')
      .insert({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .returning('*');

    await trx('user_organization').insert({
      user_id: createdUser.id,
      organization_id: organizationId,
      user_role_id: userRoleId,
    });

    trx.commit();

    delete createdUser.password;

    return createdUser;
  } catch (error) {
    trx.rollback();
    throw error;
  }
}

module.exports = {
  findUserByEmail,
  createForOrganization,
};
