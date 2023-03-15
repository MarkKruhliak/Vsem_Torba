const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    phoneNumber: {type: String},
    name: {type: String},
    email: {type: String},
    password: {type: String}
})

module.exports = model('user', UserSchema)
