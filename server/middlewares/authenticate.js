const jwt = require('jsonwebtoken');
const userQueries = require('../database/user-queries');
const userOrganizationQueries = require('../database/user-organization-queries');
const { JWT_SECRET } = require('../constants');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    const { user } = payload;

    const existingUser = await userQueries.findUserByEmail(user.email);

    if (!existingUser) {
      return res.status(403).send({ message: 'Invalid token' });
    }

    const userOrganizations =
      await userOrganizationQueries.fetchUserOrganizations(existingUser.id);

    existingUser.organizations = userOrganizations;

    delete existingUser.password;

    req.user = existingUser;

    next();
  });
};

module.exports = { authenticate };
