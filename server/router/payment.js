const router = require("express").Router();
const { payment, paymentCreate, apiKey } = require("../controllers/payment");

router.route("/pay").post(payment);

router.route("/create").post(paymentCreate);

router.route("/apiKey").get(apiKey);

module.exports = router;
