/* jshint esversion: 11, node: true */
const bcrypt = require('bcryptjs');

async function makeUserDocument({ username, email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  return {
    username,
    email: email.toLowerCase(),
    passwordHash,
    bio: 'Collector of bright second chances.',
    createdAt: new Date()
  };
}

module.exports = { makeUserDocument };
