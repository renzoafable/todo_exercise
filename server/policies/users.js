async function canCreateUserForOrganization(user, organization) {
  // Step 1. Check if user is super
  return user.email === 'superuser@gmail.com';
  // Step 2. Check if user is an admin of the organization
}

module.exports = { canCreateUserForOrganization };
