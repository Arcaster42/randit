const mongoose = require('mongoose')

const UserModel = mongoose.model('User', new Schema({
    first_name: String,
    last_name: String,
    email: String,
    pass_hash: String
}))

module.exports = { UserModel }