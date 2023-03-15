const {findActionToken} = require("../services/actionToken.service");

module.exports = {
    checkActionTokenForValid: async (req, res, next) => {
       try {
           const {token, user} = req.query
           // console.log(token);
           // console.log(user);

           if (!token){
               return next(new Error('No token'))
           }

           const actionToken = await findActionToken({actionToken: token})
           console.log(actionToken.user);

           if (!findActionToken){
               return next(new Error('No actionToken in BD'))
           }

           res.json('Very nice')

       }catch (e) {
           next(e)
       }

    }
}
