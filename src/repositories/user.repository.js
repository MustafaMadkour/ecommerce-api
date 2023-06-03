const User = require('../models/user.model')

class UserRepository {
  async create(user) {
    const newUser = new User(user)
    return await newUser.save()
  }

  async findByEmail(email) {
    return await User.findOne({ email })
  }

  async findById(id) {
    return await User.findById(id)
  }
}

module.exports = UserRepository