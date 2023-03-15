const {Auth} = require("../database");

module.exports = {

    saveTokens(object) {
        return Auth.create(object)
    },

    deleteOneByParams(filter) {
        return Auth.deleteOne(filter)
    },

    getOneUser(filter) {
        return Auth.findOne(filter).populate('user')
    }
}
