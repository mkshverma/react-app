const { validationResult } = require('express-validator')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')

const DefaultContoller = {
  signup: function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }
    const { firstname, lastname, email, password } = req.body
    const user = new User({
      name: {
        first: firstname,
        last: lastname
      },
      email: email
    })
    user.setPassword(password)
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
  },

  login: function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }
    const { email, password } = req.body
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return res.status(200).json({
          status: false,
          message: err.message
        })
      }
      if (!user) {
        return res.status(200).json({
          status: false,
          message: 'Invalid Email address or password'
        })
      }
      if (!user.validPassword(password)) {
        res.status(200).json({
          status: false,
          message: 'Invalid Email address or password'
        })
        return
      }
      const token = jwt.sign(
        user.toObject(),
        config.jwtSecret,
        { expiresIn: 3600 }
      )
      let userA = user.toObject();
      delete userA.hash;
      delete userA.salt;
      res.cookie('AccessToken', token,  { httpOnly: true, expires: 0 });
      res.status(200).json({
        status: true,
        data: userA,
        message: 'success'
      })
    })
  },
  upload: function (req, res) {
    if(req.file){
      return res.json({file: req.file, status: true})
    }
    return res.json({status: false})
  },
  logout: function (req, res) {
    res.cookie('AccessToken', '',  { httpOnly: true, expires: new Date(0) });
    return res.json({})
  }
}

module.exports = DefaultContoller
