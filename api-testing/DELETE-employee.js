const axios = require('axios');
const url = require('./constants');

async function deleteEmployee(url) {
  try {
    const { data, status } = await axios.delete(`${url}/employees/2`);
    console.log(data, status);
  } catch (err) {
    console.error(err);
  }
}

deleteEmployee(url);
