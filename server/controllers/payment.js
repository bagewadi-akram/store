const crypto = require("crypto");
const Payment = require("../model/payment");
const Razorpay = require("razorpay");
// razorpay API key and secret

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.apiKey = async (req, res) => {
  const key = process.env.RAZORPAY_KEY_ID;
  res.status(200).json({ key });
};

exports.paymentCreate = async (req, res) => {
  const options = {
    amount: Number(req.body.totalPrice * 100),
    currency: "INR",
  };
  try {
    const order = await instance.orders.create(options);

    res.status(200).json({ order });
  } catch (error) {
    res
      .status(200)
      .json({ message: "Error Occurred !!, Check Internet Connection...", error });
  }
};

exports.payment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log("req.body :>> ", req.body);
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    //  Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
