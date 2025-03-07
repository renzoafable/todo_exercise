const knex = require('./connection');

async function create(name) {
  const [organization] = await knex('organizations')
    .insert({ name })
    .returning('*');

  return organization;
}

async function findByName(name) {
  const organization = await knex('organizations')
    .where({ name })
    .returning('*')
    .first();

  return organization;
}

async function findById(id) {
  const organization = await knex('organizations')
    .where({ id })
    .returning('*')
    .first();

  return organization;
}

module.exports = {
  create,
  findByName,
  findById
};
