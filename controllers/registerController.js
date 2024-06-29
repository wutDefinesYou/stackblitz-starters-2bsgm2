const userDB = {
  users: require('../model/users'),
  setUser: function (data) {
    this.users = data;
  },
};
const { writeFile } = require('fs/promises');
const { join } = require('path');
const { hash } = require('bcryptjs');

async function createNewUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).json({ message: 'username or password required' });

  const userExists = userDB.users.find((user) => username === user.username);
  if (userExists) res.sendStaus(409);
  try {
    const hashedPassword = await hash(password, 10);
    const newUser = { username: username, password: hashedPassword };
    userDB.setUser([...userDB.users, newUser]);
    await writeFile(
      join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res.status(201).json({ message: `new user ${username} created` });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
}

module.exports = { createNewUser };
