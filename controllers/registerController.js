const User = require('../model/User')
const { hash } = require('bcryptjs')

async function createNewUser(req, res) {
  const { username, password } = req.body
  if (!username || !password)
    return res.status(400).json({ message: 'username or password required' })

  const foundUser = await User.findOne({ username }).exec()
  if (foundUser) return res.sendStatus(409)

  try {
    const hashedPassword = await hash(password, 10)
    const result = await User.create({
      username,
      password: hashedPassword,
    })
    console.log(result)
    res.status(201).json({ message: `new user ${username} created` })
  } catch (err) {
    res.status(500).json({ message: `${err.message}` })
  }
}

module.exports = { createNewUser }
