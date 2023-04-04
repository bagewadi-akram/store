//config router
//config router
const router = require("express").Router();

const {
  newOrder,
  getSingle,
  myOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//Route to order controller

//route to create order (user)
router.route("/new").post(isAuthenticatedUser, newOrder);

//get single order (user )
router.route("/get/:id").get(isAuthenticatedUser, getSingle);

//get (user)
router.route("/getMyOrders").get(isAuthenticatedUser, myOrder);

//route to get all orders in database
router.route("/admin/orders").get(getAllOrders);

//route to update status and delete order
router
  .route("/updateOrder/:id")
  .put(isAuthenticatedUser, authorizeRoles("seller"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("seller"), deleteOrder);

module.exports = router;
