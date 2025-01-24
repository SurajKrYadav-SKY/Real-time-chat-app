const UserRepository = require("../repository/user-repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.findBy({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    try {
      const user = await this.getUserByEmail(data.email);
      if (!user) {
        throw {
          message: "User not found",
        };
      }

      if (!user.comparePassword(data.password)) {
        throw {
          message: "Incorrect password",
        };
      }

      const token = user.generateJWT();
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
