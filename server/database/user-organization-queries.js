const knex = require('./connection');

async function fetchUserOrganizations(userId) {
  const organizations = await knex('user_organization')
    .join(
      'organizations',
      'user_organization.organization_id',
      'organizations.id'
    )
    .join('user_roles', 'user_organization.user_role_id', 'user_roles.id')
    .where('user_organization.user_id', userId)
    .select('organizations.id as org_id', 'user_roles.name as role');

  return organizations.map((org) => ({
    id: org.org_id,
    role: org.role,
  }));
}

module.exports = {
  fetchUserOrganizations,
};
