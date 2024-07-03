const User = require('../model/User')
const jwt = require('jsonwebtoken')

async function handleRefreshToken(req, res) {
  const cookies = req.cookies
  if (!cookies['jwt']) return res.sendStatus(401)
  const refreshToken = cookies['jwt']

  const user = await User.findOne({ refreshToken }).exec()
  if (!user) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.username !== decoded.username) res.sendStatus(403)

    const roles = Object.values(user.roles)
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    )
    res.json({ accessToken })
  })
}

module.exports = { handleRefreshToken }
