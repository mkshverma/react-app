const Users = require('../models/user.model')

const UserContoller = {
  getUsers: function (req, res) {
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0
    Users.find({})
      .limit(limit)
      .skip(offset)
      .exec(function (err, users) {
        if (err) {
          return res.status(200).json({
            status: false,
            error: err,
            message: 'Something went wrong'
          })
        }
        return res.status(200).json({
          status: true,
          users: users
        })
      })
  },
  getUser: function (req, res) {
    Users.findOne({ _id: req.decoded._id })
      .exec(function (err, user) {
        if (err) {
          return res.status(200).json({
            status: false,
            error: err,
            message: 'Something went wrong'
          })
        }
        return res.status(200).json({
          status: true,
          user: user
        })
      })
  }
}

module.exports = UserContoller
