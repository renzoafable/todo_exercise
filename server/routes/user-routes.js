const bcrypt = require('bcryptjs');
const organizationQueries = require('../database/organization-queries');
const userQueries = require('../database/user-queries');
const authorize = require('../helpers/authorize');
const { canCreateUserForOrganization } = require('../policies/users');

async function postOrganizationUser(req, res) {
  const { organizationId } = req.params;
  const { userRoleId, user } = req.body;

  authorize(req, res)(canCreateUserForOrganization, undefined, async () => {
    const existingOrganization = await organizationQueries.findById(
      organizationId
    );

    if (!existingOrganization) {
      return res.status(400).send({ message: 'Organization does not exist' });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    const createdUser = await userQueries.createForOrganization({
      user,
      organizationId,
      userRoleId,
    });

    return res.send({
      user: createdUser,
      message: 'Successfully created organization',
    });
  });
}

const toExport = {
  postOrganizationUser: {
    method: postOrganizationUser,
    errorMessage: 'Could not post user',
  },
};

module.exports = toExport;
