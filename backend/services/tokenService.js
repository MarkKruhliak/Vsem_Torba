const jwt = require('jsonwebtoken')

module.exports = {
    createAccessTokens: function (payload) {
        const access_token = jwt.sign(payload, process.env.SECRET_KEY_FOR_ACCESS, {expiresIn: '20s'})
        const refresh_token = jwt.sign(payload, process.env.SECRET_KEY_FOR_REFRESH, {expiresIn: '7d'})
        return {
            access_token,
            refresh_token
        }
    },


}
