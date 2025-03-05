async function canCreateUserForOrganization(user, organization) {
  // Step 1. Check if user is super
  const isSuper = user.email === 'superuser@gmail.com';
  // Step 2. Check if user is an admin of the organization
  const userIsAdminOfOrganization = user.organizations.find(
    (org) => org.id === organization.id && org.role === 'org_admin'
  );

  return isSuper || userIsAdminOfOrganization;
}

module.exports = { canCreateUserForOrganization };
