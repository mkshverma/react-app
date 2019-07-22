const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String, 
    email: { type: String, required: true, unique: true },
    password: String,
    is_admin: {type: Boolean, default: false},
    registeredAt: { type: Date, index: true }
});
const User = mongoose.model('User', userSchema);

module.exports = User;