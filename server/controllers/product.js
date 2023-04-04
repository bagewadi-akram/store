const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//Function to Create Product.....
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  //Generate Product Id using ShortId
  const shortid = require("shortid").generate();
  req.body._id = `str-${shortid}prd`;

  req.body.seller = req.user.name;
  let images = [];

  if (typeof req.body.image === "string") {
    images.push(req.body.image);
  } else {
    images = req.body.image;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.image = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  //Success Response
  res.status(200).json({
    success: true,
    message: "Product Created Successfully",
    product,
  });
});

// Function To Get All Products.....
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 10;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  let filteredProductsCount = products.length;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//Function to get all products of seller
exports.getAllOfSeller = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 10;

  const productCount = await Product.countDocuments({ seller: req.user.name });

  const apiFeatures = new ApiFeatures(
    Product.find({ seller: req.user.name }),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeatures.query;
  //Success Response
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
  });
});

//Function To Get Single Product
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    //Authorization Error
    return res.status(404).json({ message: "Product Not Found !!" });
  }

  //Success Response
  res.status(200).json({
    success: true,
    message: "Product Found !!",
    product,
  });
});

// Function To Modify Product.....
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    //Authorization Error
    return res.status(404).json({ message: "Product Not Found !!" });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  //Success Response
  res.status(200).json({
    success: true,
    message: "Product Modified Successfully",
    product,
  });
});

// Function To Delete Product.....
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    //Authorization Error
    return res.status(404).json({ message: "Product Not Found !!" });
  }

  const result = await product.deleteOne();
  //Success Response
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully !!",
    result,
  });
});
