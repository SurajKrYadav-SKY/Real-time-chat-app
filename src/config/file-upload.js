const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PROFILE_UPLOAD_DIR } = require("./serverConfig");

// const storage = multer.diskStorage({
//   destination: "uploads/profiles",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

//mechanism to ensure the uploads/profiles directory exists before files are saved. Add a directory check using fs:

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = PROFILE_UPLOAD_DIR;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|svg/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .webp or .png files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

module.exports = {
  upload,
};
