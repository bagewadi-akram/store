const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/user");
const sendToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Create New user Buyer
exports.registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    sendToken(user, 201, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      error = error.errors;
      if (error.name) {
        return res.status(400).json({
          success: false,
          message: error.name.message,
        });
      }
      if (error.password) {
        return res.status(400).json({
          success: false,
          message: error.password.message,
        });
      }
    }

    if (error.name === "MongoServerError") {
      return res
        .status(400)
        .json({ success: false, message: "Entered Email Already Exist !!" });
    }
  }
};

//Create New  Seller
exports.registerSeller = async (req, res, next) => {
  try {
    const { name, email, password, role = "seller" } = req.body;

    const user = await User.create({ name, email, password, role });

    sendToken(user, 201, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      error = error.errors;
      if (error.name) {
        return res.status(400).json({
          success: false,
          message: error.name.message,
        });
      }
      if (error.password) {
        return res.status(400).json({
          success: false,
          message: error.password.message,
        });
      }
    }

    if (error.name === "MongoServerError") {
      return res
        .status(400)
        .json({ success: false, message: "Entered Email Already Exist !!" });
    }
  }
};

//login user
exports.logUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Input Field Empty !!, Enter Email & Password" });

  const user = await User.findOne({ email }).select("+password");

  //Checking for email
  if (!user)
    return res
      .status(401)
      .json({ message: "Invalid Request !!, Email &  Password Doesn't Match" });

  // verifying password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return res
      .status(401)
      .json({ message: "Invalid Request !!, Email &  Password Doesn't Match" });

  sendToken(user, 200, res);
});

//login seller
exports.logSeller = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Input Field Empty !!, Enter Email & Password" });

  const user = await User.findOne({ email }).select("+password");

  //Checking for email
  if (!user)
    return res
      .status(401)
      .json({ message: "Invalid Request !!, Email &  Password Doesn't Match" });

  // verifying password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return res
      .status(401)
      .json({ message: "Invalid Request !!, Email &  Password Doesn't Match" });

  if (user.role == "seller") {
    return sendToken(user, 200, res);
  } else {
    return res.status(401).json({
      message: "Invalid Request !!, The User Account Is Not Register As Seller",
    });
  }
  sendToken(user, 200, res);
});

//Log Out
exports.logOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logged Out Successfully !!",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).json({ message: "User Not Found !!" });

  //Get  ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/user/passwordReset/${resetToken}`;

  //temp reset link development
  const resetPasswordUrl = `${process.env.FRONT_END_URL}/user/passwordReset/${resetToken}`;
  const message = `Your Password Reset Link is :- \n\n ${resetPasswordUrl} \n\n  If you have not requested this email then, please ignore it`;

  try {
    const result = await sendEmail({
      email: user.email,
      subject: "Store Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Password Reset Link Successfully Sent To :${user.email}.!`,
      result,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({ message: error.message });
  }
});

//Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({
      message: "Reset Password Link is Invalid!! or Has Been Expired!!",
    });

  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({ message: "Password Doesn't Match" });

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "User Not Found !!" });

  res.status(200).json({ success: true, user });
});

//Update User Details
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched)
      return res
        .status(400)
        .json({ success: false, message: "Old Password Incorrect !!" });

    if (req.body.newPassword !== req.body.confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: "Password Doesn't Match" });

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//Update User Profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User Data Successfully Updated...",
    user,
  });
});
