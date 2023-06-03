const bcrypt = require('bcrypt')
const UserRepository = require('../repositories/user.repository')
const { BadRequestError, NotFoundError } = require('../utils/errors')

class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }

  async register(user) {
    const existingUser = await this.userRepository.findByEmail(user.email)
    if (existingUser) {
      throw new BadRequestError('Email already in use')
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword

    return await this.userRepository.create(user)
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new BadRequestError('Incorrect password')
    }

    return user
  }
}

module.exports = UserService