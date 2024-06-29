const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};
const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { writeFile } = require('fs/promises');
const { join } = require('path');

async function handleLogIn(req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).json('username or password required');

  const user = userDB.users.find((user) => user.username === username);
  if (!user) res.sendStatus(401); // Unauthorized

  const match = await compare(password, user.password);
  if (match) {
    const roles = Object.values(user.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    );
    const refreshToken = jwt.sign(
      { username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const otherUsers = userDB.users.filter(
      (user) => user.username !== username
    );
    const updatedUser = { ...user, refreshToken };
    userDB.setUsers([...otherUsers, updatedUser]);
    try {
      await writeFile(
        join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(userDB.users)
      );
    } catch (err) {
      console.log(err);
      throw err;
    }

    // TODO: cookies cannot be set successfully
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else res.sendStatus(401);
}

module.exports = { handleLogIn };
