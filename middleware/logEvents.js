const { join } = require('path')
const { existsSync } = require('fs')
const { appendFile, mkdir } = require('fs/promises')
const { v4 } = require('uuid')

async function logEvents(message, logName) {
  const logItem = `${new Date().toLocaleString()}\t${v4()}\t${message}\n`

  try {
    if (!existsSync(join(__dirname, '..', 'logs')))
      await mkdir(join(__dirname, '..', 'logs'))

    await appendFile(join(__dirname, '..', 'logs', logName), logItem)
  } catch (err) {
    // console.log(err);
  }
}

function logger(req, res, next) {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
  next()
}

module.exports = { logger, logEvents }
