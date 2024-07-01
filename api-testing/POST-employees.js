const axios = require('axios')
const url = require('./constants')

async function postEmployees(url) {
  try {
    const { data, status } = await axios.post(
      `${url}/employees`,
      {
        firstname: 'Jane',
        lastname: 'Doe',
      },
      {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VybmFtZSI6IkphY2siLCJyb2xlcyI6WzIwMDFdfSwiaWF0IjoxNzE5NDYyMzM5LCJleHAiOjE3MTk0NjIzOTl9.8bwUJhilMnIZvc7Zqmrlx_ch4c7alB0hc1HoNC-4l-Y',
        },
      }
    )
    console.log(data, status)
  } catch (err) {
    console.log(err)
  }
}

postEmployees(url)
