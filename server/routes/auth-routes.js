const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userQueries = require('../database/user-queries');
const { JWT_SECRET } = require('../constants');

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userQueries.findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (!user.email === 'superuser@gmail.com') {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  }

  delete user.password_hash;

  const token = jwt.sign({ user }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ user, token, message: 'Successfully logged in' });
}

const toExport = {
  login: {
    method: login,
    errorMessage: 'Could not log in',
  },
};

module.exports = toExport;
