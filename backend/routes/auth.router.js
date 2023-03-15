const {Router} = require('express')
const {authController} = require("../controllers");
const {refreshMDWL, accessMDWL, actionTokenMDWL} = require("../middlewares");

const AuthRouter = Router()

AuthRouter.post('/registration', authController.registration)

AuthRouter.post('/login', authController.login)
AuthRouter.post('/logout', authController.logout)

AuthRouter.post('/refresh', refreshMDWL.refreshMDWL, authController.refresh)
AuthRouter.post('/checkToken', accessMDWL.accessFunction)

AuthRouter.post('/forgot-pass', authController.forgotPassword)
AuthRouter.post('/forgot-pass/check_Token', actionTokenMDWL.checkActionTokenForValid)
AuthRouter.post('/set_new_password', authController.setNewPassword)


module.exports = AuthRouter;
