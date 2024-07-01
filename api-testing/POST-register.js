const axios = require('axios')
const url = require('./constants')

async function register(url) {
  try {
    const { data, status } = await axios.post(`${url}/register`, {
      username: 'Jack',
      password: 'qwerty',
    })
    console.log(data, status)
  } catch (err) {
    console.log(err.message)
  }
}

register(url)
