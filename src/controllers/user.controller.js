const UserService = require('../services/user.service')
const { BadRequestError, NotFoundError } = require('../utils/errors')

class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async register(req, res, next) {
    try {
      const user = await this.userService.register(req.body)
      res.status(201).json(user)
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message })
      } else {
        next(error)
      }
    }
  }

  async login(req, res, next) {
    try {
      const user = await this.userService.login(req.body.email, req.body.password)
      res.json(user)
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        res.status(401).json({ message: error.message })
      } else {
        next(error)
      }
    }
  }
}

module.exports = UserController