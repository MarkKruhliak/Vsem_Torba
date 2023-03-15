const jwt = require('jsonwebtoken')

module.exports = {
    accessFunction: async (req, res, next) => {
        try {
            const refresh_token = req.headers.authorization

            if (!refresh_token){
                return next(new Error('No token'))
            }

            const verifyToken = await jwt.verify(refresh_token, process.env.SECRET_KEY_FOR_REFRESH)

            if (!verifyToken){
                return next(new Error('Token doesn`t valid'))
            }

            res.json('Ok')

        } catch (e) {
            next(e)
        }
    }
}
