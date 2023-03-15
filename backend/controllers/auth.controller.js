const {UserService, PasswordService, TokenService, AuthService, ActionTokenService} = require("../services");
const {sendEmail} = require("../services/email.service");
const {saveActionToken, deleteActionToken, findActionToken} = require("../services/actionToken.service");
const {User} = require("../database");

module.exports = {

    registration: async (req, res, next) => {

        try {
            const {email, password} = req.body

            const isExistUser = await UserService.getOneUser({email})

            if (isExistUser) {
                return next(new Error('This user already exist!'))
            }

            const generatePassword = await PasswordService.generateHash(password)
            await UserService.createUser({...req.body, password: generatePassword})

            res.json('well done')

        } catch (e) {
            next(e)
        }
    },

    login: async (req, res, next) => {

        try {
            const {email, password} = req.body

            const isExistUser = await UserService.getOneUser({email})


            if (!isExistUser) {
                return next(new Error('This user doesn`t exist yet!'))
            }

            const comparePassword = await PasswordService.comparePassword(password, isExistUser.password)

            if (!comparePassword) {
                return next(new Error('Doesn`t right password '))
            }

            await AuthService.deleteOneByParams({user: isExistUser._id})

            const generateToken = TokenService.createAccessTokens({user: isExistUser.email})
            const user = await AuthService.saveTokens({...generateToken, user: isExistUser._id})


            res.json(user)

        } catch (e) {
            next(e)
        }
    },


    logout: async (req, res, next) => {

        try {

            const access_token = req.headers.authorization

            if (!access_token) {
                return next(new Error('User is not authorization!'))
            }

            const findTokenInBd = await AuthService.getOneUser({access_token})
            console.log(findTokenInBd);

            if (!findTokenInBd) {
                return next(new Error('No token in BD'))
            }

            await AuthService.deleteOneByParams({access_token: findTokenInBd.access_token})

            res.json('You logout from this site')

        } catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.user
            console.log(refresh_token);

            const {user} = await AuthService.getOneUser({refresh_token})
            console.log(user);

            await AuthService.deleteOneByParams({user: user._id})

            const generateToken = TokenService.createAccessTokens({user: user._id})
            const saveToken = await AuthService.saveTokens({...generateToken, user: user._id})

            res.json(saveToken)

        } catch (e) {
            next(e)
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body

            const isExistUser = await UserService.getOneUser({email})

            if (!isExistUser) {
                return next(new Error('This user doesn`t exist yet!'))
            }

            const tokenForThisUser = await ActionTokenService.creteActionToken({email})

            await saveActionToken({...{actionToken: tokenForThisUser}, user: isExistUser._id})

            await sendEmail('mark25ua@gmail.com', 'forgotPassword', {userName: email}, tokenForThisUser, isExistUser._id)

            res.json(tokenForThisUser)

        } catch (e) {
            next(e)
        }
    },

    setNewPassword: async (req, res, next) => {

        const {password, set_password} = req.body
        const token = req.query.token
        console.log(token);

        if (password !== set_password) {
            return next(new Error('Not the same password'))
        }

        if (!token) {
            return next(new Error('No token'))
        }

        const {user} = await findActionToken({actionToken: token})
        console.log(user);
        if (!user) {
            return next(new Error('No actionToken in BD'))
        }

        await AuthService.deleteOneByParams({user: user._id})
        await deleteActionToken({user: user._id})

        const generatePassword = await PasswordService.generateHash(password)


        await User.updateOne({email: user.email}, {password: generatePassword})

        const generateToken = TokenService.createAccessTokens({user: user.email})
        await AuthService.saveTokens({...generateToken, user: user._id})

        res.json('done')
    }
}
