const User = require("../models/user");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async get(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id, data) {
    try {
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async destroy(id) {
    try {
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findBy(data) {
    try {
      const response = await User.findOne(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
