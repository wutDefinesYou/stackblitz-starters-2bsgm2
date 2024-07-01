const express = require('express')
const { resolve, join } = require('path')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

const { logger } = require('./middleware/logEvents')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')

const app = express()
const port = 3010

connectDB()

// custom middleware logger
// app.use(logger)

// allow credentials
app.use(credentials)

// CORS
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

//serve static files
app.use(express.static(resolve('static')))

// routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/api/register'))
app.use('/auth', require('./routes/api/auth'))
app.use('/refresh', require('./routes/api/refresh'))
app.use('/logout', require('./routes/api/logout'))
app.use('/employees', verifyJWT, require('./routes/api/employees'))

// 404
app.all('*', (req, res) => {
  res.status(404)

  if (req.accepts('html')) res.sendFile(join(__dirname, 'views', '404.html'))
  else if (req.accepts(json)) res.json({ error: '404 not found' })
  else res.type('txt').send('404 not found')
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB')
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})
