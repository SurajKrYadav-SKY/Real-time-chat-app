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

  async update(userId, data) {
    try {
      const { firstName, lastName, color } = data;
      console.log(
        "data type of incomming data",
        typeof firstName,
        typeof lastName,
        typeof color
      );

      console.log("color :", color);
      if (!firstName || !lastName || color === null) {
        throw new Error("First name, last name, and color are required");
      }

      if (typeof firstName !== "string" || typeof lastName !== "string") {
        throw new Error("First name, last name, and color must be strings");
      }
      const result = await User.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
          color,
          profileSetup: true,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return result;
    } catch (error) {
      console.error("Error in the update method:", error.message);
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
