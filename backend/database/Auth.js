const {model, Schema} = require('mongoose')

const AuthSchema = new Schema({
    access_token: {type: String},
    refresh_token: {type: String},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = model('auth', AuthSchema)
