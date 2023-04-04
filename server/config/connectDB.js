const mongoose = require("mongoose");

// To Ignore DeprecationWarning (True/False)
mongoose.set("strictQuery", false);

//Connect to mongo DB server
mongoose
  .connect(`${process.env.URI}/test`)
  .then((result) => console.log("Mongo Connection Success"));
