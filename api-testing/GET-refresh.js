const axios = require('axios');
const url = require('./constants');

(async function refreshToken() {
  try {
    const { data, status } = await axios.get(`${url}/refresh`, {
      withCredentials: true,
    });
    console.log(data, status);
  } catch (err) {
    console.log(err);
  }
})();
