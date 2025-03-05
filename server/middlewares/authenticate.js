const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    const { user } = payload;
    req.user = user;

    next();
  });
};

module.exports = { authenticate };
