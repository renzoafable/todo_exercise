const organizationQueries = require('../database/organization-queries');
const authorize = require('../helpers/authorize');
const { canCreateOrganization } = require('../policies/organizations');

async function postOrganization(req, res) {
  authorize(req, res)(canCreateOrganization, undefined, async () => {
    const { name } = req.body;

    const existingOrganization = await organizationQueries.findByName(name);

    if (existingOrganization) {
      return res.status(400).send({ message: 'Organization already exists' });
    }

    const organization = await organizationQueries.create(name);

    return res.send({
      organization,
      message: 'Successfully created organization',
    });
  });
}

const toExport = {
  postOrganization: {
    method: postOrganization,
    errorMessage: 'Could not post organization',
  },
};

module.exports = toExport;
