const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    pass_hash: String
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = { UserModel }