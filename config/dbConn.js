const mongoose = require('mongoose')

async function dbConn() {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = dbConn
