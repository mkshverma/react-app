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
    Users.findOne({ _id: req.params.id })
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
  },
  getCurrentUser: function (req, res) {
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
  },
  updateUser: function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        if (err) {
          return res.status(200).json({
            status: false,
            error: err,
            message: 'User not Found'
          })
        }
        const { display_name, email, password, is_admin } = req.body
        user.name.first = display_name
        // user.name.last = lastname
        user.email = email
        user.is_admin = is_admin
        if(password){
          user.setPassword(password)
        }
        user.save(function (err) {
          if (err) {
            res.status(200).json({
              status: false,
              message: err.message
            })
            return
          }
          res.status(200).json({
            status: true,
            message: 'User updated successfully'
          })
        })
      })
  },

  createUser: function (req, res) {
    const { display_name, email, password, is_admin } = req.body
    let user = new Users()
    user.name.first = display_name
    // user.name.last = lastname
    user.email = email
    user.is_admin = is_admin
    if(password){
      user.setPassword(password)
    }
    user.save(function (err) {
      if (err) {
        res.status(200).json({
          status: false,
          message: err.message
        })
        return
      }
      res.status(200).json({
        status: true,
        message: 'User created successfully'
      })
    })
  }
}

module.exports = UserContoller
