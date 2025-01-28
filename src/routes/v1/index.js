const express = require("express");
const {
  signup,
  login,
  getUserInfo,
  updateProfile,
} = require("../../controller.js/auth-controller");
const { verifyToken } = require("../../middleware/auth-middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", verifyToken, getUserInfo);
router.post("/update-profile", verifyToken, updateProfile);

module.exports = router;
