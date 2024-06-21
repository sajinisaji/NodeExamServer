const express = require ("express")
const userController = require('../Controllers/UserControllers')

const jwtMiddleware = require('../MiddleWare/jwtMiddleware')

const router = new express.Router()

router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.get('/users', jwtMiddleware, userController.listUsersController);

router.get('/users/:id', jwtMiddleware, userController.viewUserController);

module.exports = router