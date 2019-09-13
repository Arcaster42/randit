const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    pass_hash: String,
    checkin: { active: Boolean, start: Date, end: Date, timeleft: Number, message: String },
    contacts: [String]
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = { UserModel }