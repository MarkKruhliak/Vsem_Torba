const {Router} = require('express')
const {userController} = require("../controllers");

const userRouter = Router();

userRouter.get('/', userController.getAllUsers)


module.exports = userRouter;
