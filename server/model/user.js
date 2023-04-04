const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Input Field Empty, Please Enter User Name..."],
    maxLength: [30, "User Name Cannot Exceed 30 Characters"],
    minLength: [4, "User Name Should Have Min 4 Characters"],
  },

  email: {
    type: String,
    required: [true, "Input Field Empty, Please Enter User Name..."],
    unique: true,
    validate: [validate.isEmail, "Invalid Email !!"],
  },

  password: {
    type: String,
    required: [true, "Input Field Empty, Please Enter Password..."],
    minLength: [6, "Password Should Be More Than 6 Characters"],
    select: false,
  },

  role: { type: String, default: "buyer" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
});

//Generate JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  //Generate Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and Adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
