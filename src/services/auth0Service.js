const axios = require('axios');

async function getManagementToken() {
  const res = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    grant_type: 'client_credentials',
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
  });

  return res.data.access_token;
}

async function registerUser(email, password) {
  const token = await getManagementToken();

  const res = await axios.post(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
    email,
    password,
    connection: 'Username-Password-Authentication',
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  return res.data;
}

async function loginWithCredentials(email, password) {
  const res = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    grant_type: 'password',
    username: email,
    password,
    audience: process.env.AUTH0_AUDIENCE,
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'openid profile email',
  });

  return res.data;
}

module.exports = {
  getManagementToken,
  registerUser,
  loginWithCredentials
};

