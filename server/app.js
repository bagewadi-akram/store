const express = require("express");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//Express Configuration
const app = express();

//Function to get json data from client
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

//MiddleWare for Error
app.use(errorMiddleware);

// Route imports
const product = require("./router/product");
const user = require("./router/user");
const order = require("./router/order");
const payment = require("./router/payment");

app.use("/product", product);
app.use("/user", user);
app.use("/order", order);
app.use("/payment", payment);
app.get("/online/offline", (req, res) => {
  res.status(200).json({ success: true, message: "Server Is Online" });
});

//Export module
module.exports = app;
