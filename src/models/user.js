const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, SALT } = require("../config/serverConfig");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    color: {
      type: Number,
      requred: false,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  const saltRounds = Number(SALT);
  const salt = bcrypt.genSaltSync(saltRounds);
  const encryptedPassword = bcrypt.hashSync(user.password, salt);
  user.password = encryptedPassword;
  next();
});

userSchema.methods.comparePassword = function compare(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function genetate() {
  return jwt.sign({ id: this._id, email: this.email }, SECRET_KEY, {
    expiresIn: "2h",
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
