const UserService = require("../services/user-service");
const UserRepository = require("../repository/user-repository");

const userService = new UserService();

const signup = async (req, res) => {
  try {
    const response = await userService.signup({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller.",
      data: {},
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: token,
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
};

module.exports = {
  signup,
  login,
};
