const User = require("../models/user");
const { unlink } = require("fs/promises");

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

  async updateProfile(userId, fileName) {
    console.log(fileName);
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      user.image = fileName;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async removeProfile(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("user not found");
      }
      if (user.image) {
        try {
          await unlink(user.image); // Delete the file
        } catch (err) {
          console.error("Error deleting image file:", err);
        }
      }
      user.image = null;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserRepository;
