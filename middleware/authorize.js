const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function (req, res, next) {
  let token = req.headers['authorization']
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided.'
    })
  }
  token = token.slice(7, token.length)
  jwt.verify(
    token,
    config.jwtSecret,
    function (err, decoded) {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.'
        })
      }
      req.decoded = decoded
      next()
    })
}
