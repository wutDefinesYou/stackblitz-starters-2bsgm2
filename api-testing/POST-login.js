const axios = require('axios')
const url = require('./constants')

async function logIn() {
  try {
    const { data, status } = await axios.post(`${url}/auth`, {
      username: 'Jack',
      password: 'qwerty',
    })
    console.log(data, status)
  } catch (err) {
    console.log(err.message)
  }
}

logIn()

// 'Jane'
// '!Ach67a'
