//Input Credentials
require("dotenv").config();

//Connection to database
require("./config/connectDB");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//App Config
const app = require("./app");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down server due to Uncaught Exception`);
  process.exit(1);
});

//Start server....
const server = app.listen(process.env.PORT, () =>
  console.log(`Server is hosted at:http://:${process.env.PORT}`)
);

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
