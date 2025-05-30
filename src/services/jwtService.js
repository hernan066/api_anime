const jwt = require('jsonwebtoken');

function signUser(user) {
  return jwt.sign(
    {
      sub: user.auth0Id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
}

module.exports = { signUser };
