const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data
  },
}
const { writeFile } = require('fs/promises')
const { join } = require('path')

async function handleLogout(req, res) {
  // clean access token in the client app

  const cookies = req.cookies
  if (!cookies?.['jwt']) return res.sendStatus(204)
  const refreshToken = cookies['jwt']

  const user = usersDB.users.find((user) => user.refreshToken === refreshToken)
  if (!user) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.sendStatus(204)
  }

  const otherUsers = usersDB.users.filter(
    (user) => user.refreshToken !== refreshToken
  )
  const updatedUser = { ...user, refreshToken: '' }
  usersDB.setUsers([...otherUsers, updatedUser])
  await writeFile(
    join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(usersDB.users)
  )

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
  res.sendStatus(204)
}

module.exports = { handleLogout }
