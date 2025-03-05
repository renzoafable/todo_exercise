const authorize = (req, res) => async (policy, resource, next) => {
  const { user } = req;

  const isAuthorized = await policy(user, resource);

  if (!isAuthorized) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  next();
};

module.exports = authorize;
