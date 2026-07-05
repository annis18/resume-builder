const jwt = require('jsonwebtoken');

// Signs a JWT containing the user's Mongo _id. Called right after
// register/login (Phase 2) to issue the token the frontend will store.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
