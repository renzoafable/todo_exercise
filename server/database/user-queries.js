const knex = require('./connection');

async function findUserByEmail(email) {
  const user = await knex('users').where({ email }).returning('*').first('*');

  return user;
}

module.exports = {
  findUserByEmail,
};
