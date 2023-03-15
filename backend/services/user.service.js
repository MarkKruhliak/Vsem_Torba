const {User} = require("../database");

module.exports = {
    createUser(userObject) {
        return User.create(userObject)
    },

    getOneUser(filter) {
        return User.findOne(filter)
    },

    updateUser(filter) {
        return User.updateOne(filter)
    }
}
