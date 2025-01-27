const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/serverConfig");

const verifyToken = (req, res, next) => {
  console.log("req.cookies :", req.cookies);
  const token = req.cookies.jwt;
  if (!token) {
    console.log("token not found");
  }

  console.log("token:", token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated!",
    });
  }
  jwt.verify(token, SECRET_KEY, async (error, payload) => {
    // console.log("content of the payload", payload);
    if (error) {
      return res.status(403).json({
        message: "Token is not valid!",
      });
    }
    req.userId = payload.id;
    console.log("inside middleware : ", req.userId);
    next();
  });
};

module.exports = {
  verifyToken,
};
