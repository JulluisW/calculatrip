const express = require('express')
const userRouter = express.Router()

// controller
const UserController = require("../controllers/userControllers")

// midleware 
const authentication = require("../middlewares/Authentication")

userRouter.get('/', authentication, UserController.getUsers)
userRouter.post('/login', UserController.loginUser)
userRouter.post('/register', UserController.registerUser)
userRouter.get('/profile', authentication, UserController.getUserProfile)
userRouter.get('/profile/:input', authentication, UserController.getUserByInput)
userRouter.put('/:id', authentication, UserController.editUser)

module.exports = userRouter