const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    minLength: [6, "Password Should Be More Than 8 Characters"],
    select: false,
  },

  governmentId: {
    type: String,
    required: [true, "Input Field Empty, Please Enter GovernmentID... "],
    unique: true,
    minLength: [10, "Government Id Should Not Be Less Than 10 Characters"],
    maxLength: [12, "Government Id Should Not Be More Than 12 Characters"],
  },
  shopLicense: {
    type: String,
    required: [true, "Input Field Empty, Please Enter License Details... "],
  },
  gstNumber: {
    type: String,
    required: [true, "Input Field Empty, Please Enter GST Number... "],
    unique: true,
    minLength: [10, "GST Number Should Not Be Less Than 10 Characters"],
    maxLength: [12, "GST Number Should Not Be More Than 12 Characters"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Input Field Empty, Please Enter Phone Number... "],
    unique: true,
    minLength: [10, "Phone Number Should Not Be Less Than 10 Characters"],
    maxLength: [10, "Phone Number Should Not Be More Than 10 Characters"],
  },
  bankDetails: {
    accountNumber: {
      type: String,
      required: [true, "Input Field Empty, Please Enter Phone Number... "],
      minLength: [12, "Account Number Should Not Be Less Than 12 Characters "],
      maxLength: [12, "Account Number Should Not Exceed 12 Characters "],
      unique: true,
    },
    bankingName: {
      type: String,
      required: [true, "Input Field Empty, Please Enter Banking Name..."],
      maxLength: [30, "User Name Cannot Exceed 30 Characters"],
      minLength: [4, "User Name Should Have Min 4 Characters"],
    },
    ifscCode: {
      type: String,
      required: [true, "Input Field Empty, Please Enter User Name..."],
      maxLength: [12, "IFSC Number Cannot Exceed 12 Characters"],
      minLength: [10, "IFSC Number Should Have Min 10 Characters"],
    },
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

module.exports = mongoose.model("User", userSchema);
