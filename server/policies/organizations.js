async function canCreateOrganization(user) {
  return user.email === 'superuser@gmail.com';
}

module.exports = { canCreateOrganization };
