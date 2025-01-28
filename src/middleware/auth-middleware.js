const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/serverConfig");

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log("token not found");
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated!",
    });
  }
  jwt.verify(token, SECRET_KEY, async (error, payload) => {
    if (error) {
      return res.status(403).json({
        message: "Token is not valid!",
      });
    }
    req.userId = payload.id;
    next();
  });
};

module.exports = {
  verifyToken,
};
