const {model, Schema} = require('mongoose')

const ActionToken = new Schema({
    actionToken: {type: String},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = model('actionToken', ActionToken)
