const {
  registerUser,
  logUser,
  logOut,
  registerSeller,
  logSeller,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateUserProfile,
} = require("../controllers/user");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//config router
const router = require("express").Router();

//route to user controller

//Routes for User
router.route("/registerUser").post(registerUser);
router.route("/logUser").post(logUser);

//Routes for Seller
router.route("/registerSeller").post(registerSeller);
router.route("/logSeller").post(logSeller);

router.route("/passwordForgot").post(forgotPassword);
router.route("/passwordReset/:token").put(resetPassword);

//Routes for Getting User Details for Editing
router.route("/getUser").get(isAuthenticatedUser, getUserDetails);
router.route("/passwordChange").put(isAuthenticatedUser, updatePassword);
router.route("/updateUser").put(isAuthenticatedUser, updateUserProfile);

//Log out Route
router.route("/logout").get(logOut);

module.exports = router;
