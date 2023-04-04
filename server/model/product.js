const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Id Not Defined, Check Configurations"],
  },
  title: {
    type: String,
    required: [true, "Input Field Empty, Please Enter the Product Title..."],
  },
  seller: {
    type: String,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: [
      true,
      "Input Field Empty, Please Enter the Product Description...",
    ],
    minLength: [15, "Please Enter minimum 15-20 characters"],
  },
  category: {
    type: String,
    required: [true, "Input Field Empty, Please Enter the Product Category..."],
  },
  stock: {
    type: Number,
    required: [true, "Input Field Empty, Please Enter the Product Stock..."],
    default: 1,
  },
  price: {
    type: Number,
    required: [true, "Input Field Empty, Please Enter the Product Price..."],
  },
  discount: {
    type: Number,
    required: [true, "Input Field Empty, Please Enter the Product Discount..."],
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model("Product", productSchema);
