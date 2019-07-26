const { body } = require('express-validator')
module.exports = {
  login: function () {
    return [
      body('email', [
        'Email is required',
        'Invalid email'
      ]).exists().isEmail(),
      body('password').exists()
    ]
  },
  signup: function () {
    return [
      body('firstname', 'Invalid First Name').isString(),
      body('lastname', 'Invalid Last Name').isString(),
      body('email', 'A valid Email is required').exists().isEmail(),
      body('password').exists(),
      body(
        'confirm-password',
        'confirm password must have the same value as the password'
      ).exists()
        .custom((value, { req }) => value === req.body.password)
    ]
  },
  addPost: function () {
    return [
      body('title', ['Title is required']).escape().trim().exists(),
      body('body').exists().escape().trim(),
      body('tags').isString()
    ]
  }
}
