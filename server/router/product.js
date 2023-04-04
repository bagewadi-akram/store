const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAllOfSeller,
} = require("../controllers/product");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//config router
const router = require("express").Router();

//Route to product controller

//Route Get All Products
router.route("/getProducts").get(getAllProducts);

//Route to create product, update and delete only seller accessible
router
  .route("/createProduct/admin")
  .post(isAuthenticatedUser, authorizeRoles("seller"), createProduct);
router
  .route("/updateProduct/admin/:id")
  .put(isAuthenticatedUser, authorizeRoles("seller"), updateProduct) //For Updating
  .delete(isAuthenticatedUser, authorizeRoles("seller"), deleteProduct); //For Deleting

router.route("/getProduct/:id").get(getProductDetails); //For Fetching Single Product

// get all product of seller
router
  .route("/getAllProductsOfSeller")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getAllOfSeller);

module.exports = router;
