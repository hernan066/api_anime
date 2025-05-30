const { requireAuth } = require('@clerk/express');

const authenticateClerkUser = requireAuth();

module.exports = authenticateClerkUser;
