const express = require('express')
const UserController = require('../controllers/user.controller')

const router = express.Router()
const userController = new UserController()

router.post('/register', userController.register.bind(userController))
router.post('/login', userController.login.bind(userController))

module.exports = router