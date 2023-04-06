const Order = require("../model/order");
const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { normalizeBoolean } = require("razorpay/dist/utils/razorpay-utils");

//Create order
exports.newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res
      .status(200)
      .json({ success: true, order, message: "Order created Successfully.. " });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//Get Order Details for seller
exports.getSingle = catchAsyncErrors(async (req, res, next) => {
  //params === order id
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order)
    return res
      .status(404)
      .json({ message: `Order Not Found With This Id:${req.params.id}` });

  res.status(200).json({
    success: true,
    order,
    message: "Success Report !!",
  });
});

//Get Order Details For Logged In User
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    order,
    message: "Success Report !!",
  });
});

//GET ALL ORDERS IN DATABASE
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  const orderCount = await Order.countDocuments();

  res.status(200).json({
    success: true,
    orders,
    orderCount,
  });
});

//get orders of seller
exports.getOrders = async (req, res) => {
  const orders = await Order.find({
    orderItems: { $elemMatch: { seller: req.user.name } },
  });
  res.status(200).json({ success: true, orders });
};

//update order status
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not Found !!" });

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({ message: "Order Is Already Delivered !!" });
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not Found !!" });

  await order.deleteOne();

  res.status(200).json({ success: true });
});
