const jwt = require("jsonwebtoken");

module.exports = {

    refreshMDWL: async (req, res, next) => {
        try {
            const refresh_token = req.headers.authorization

            if (!refresh_token) {
                return next(new Error('No local token'))
            }

            const verifyToken = await jwt.verify(refresh_token, process.env.SECRET_KEY_FOR_REFRESH)

            if (!verifyToken) {
                return next(new Error('Token not valid'))
            }
            req.user = refresh_token

            next()
        } catch (e) {
            next(e)
        }
    }
}
