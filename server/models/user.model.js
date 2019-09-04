const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  email: { type: String, required: true, unique: true },
  salt: String,
  hash: String,
  is_admin: { type: Boolean, default: false },
  registeredAt: { type: Date, default: Date.now }
})

// method to set salt and hash the password for a user
// setPassword method first creates a salt unique for every user
// then it hashes the salt with user password and creates a hash
// this hash is stored in the database as user password
userSchema.methods.setPassword = function (password) {
  // creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex')

  // hashing user's salt and password with 1000 iterations,
  // 64 length and sha512 digest
  this.hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    `sha512`
  ).toString(`hex`)
}

userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    `sha512`
  ).toString(`hex`)
  return this.hash === hash
}

const User = mongoose.model('User', userSchema)

module.exports = User
