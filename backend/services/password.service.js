const bcrypt = require('bcrypt')

module.exports = {
    generateHash(password) {
        return bcrypt.hashSync(password, 10)
    },

    comparePassword(password, hashed) {
        return bcrypt.compare(password, hashed)
    }
}
