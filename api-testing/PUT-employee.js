const axios = require('axios')
const url = require('./constants')

async function putEmployee(url) {
  try {
    const { data, status } = await axios.put(`${url}/employees/2`, {
      firstname: 'Tim',
      lastname: 'Sweeney',
    })
    console.log(data, status)
  } catch (err) {
    console.error(err)
  }
}

putEmployee(url)
