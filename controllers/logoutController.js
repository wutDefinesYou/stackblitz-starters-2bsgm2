const User = require('../model/User')

async function handleLogout(req, res) {
  // clean access token in the client app

  const cookies = req.cookies
  if (!cookies?.['jwt']) return res.sendStatus(204)
  const refreshToken = cookies['jwt']

  const user = await User.findOne({ refreshToken }).exec()
  if (!user) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.sendStatus(204)
  }

  user.refreshToken = ''
  const result = await user.save()
  console.log(result)

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
  res.sendStatus(204)
}

module.exports = { handleLogout }
