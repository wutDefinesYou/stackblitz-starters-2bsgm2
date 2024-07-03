const User = require('../model/User')
const { compare } = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function handleLogIn(req, res) {
  const { username, password } = req.body
  if (!username || !password)
    return res.status(400).json('username or password required')

  const user = await User.findOne({ username }).exec()
  if (!user) return res.sendStatus(401) // Unauthorized

  const match = await compare(password, user.password)
  if (match) {
    const roles = Object.values(user.roles)
    const accessToken = jwt.sign(
      {
        userInfo: {
          username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    )
    const refreshToken = jwt.sign(
      { username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    user.refreshToken = refreshToken
    const result = await user.save()
    console.log(result)

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.json({ accessToken })
  } else res.sendStatus(401)
}

module.exports = { handleLogIn }
