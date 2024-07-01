function verifyRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401)

    const userRoles = Object.values(req.roles)
    console.log(userRoles)
    const result = userRoles.map((role) => allowedRoles.includes(role))
    if (result.every((val) => val === false)) return res.sendStatus(401)
    next()
  }
}

module.exports = verifyRoles
