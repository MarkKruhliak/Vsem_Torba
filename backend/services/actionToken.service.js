const jwt = require('jsonwebtoken')
const {ActionToken} = require("../database");

module.exports = {

    saveActionToken(object) {
        return ActionToken.create(object)
    },

    findActionToken(filter) {
        return ActionToken.findOne(filter).populate('user')
    },

    deleteActionToken(filter) {
        return ActionToken.deleteMany(filter)
    },

    creteActionToken: (payload) => {
        const actionToken = jwt.sign(payload, process.env.SECRET_KEY_FOR_ACTION_TOKEN, {expiresIn: '1d'})
        return actionToken
    }
}
