const express = require("express");
const {
  signup,
  login,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,
} = require("../../controller/auth-controller");
const { verifyToken } = require("../../middleware/auth-middleware");
const router = express.Router();
const { upload } = require("../../config/file-upload");

const profileUpload = upload.single("profile-image");

router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", verifyToken, getUserInfo);
router.post("/update-profile", verifyToken, updateProfile);
router.post("/add-profile-image", verifyToken, profileUpload, addProfileImage);
router.delete("/remove-profile-image", verifyToken, removeProfileImage);

module.exports = router;
