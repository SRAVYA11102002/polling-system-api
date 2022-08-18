// require the library
const mongoose = require("mongoose");

// connecting to the database
mongoose.connect("mongodb://localhost/question_api");

//acquire the connection to check if it is succesfull
const db = mongoose.connection;

// checking the error
db.on("error", console.error.bind(console, "error in connecting the database"));

// up and running then print the statement
db.once("open", function () {
  console.log("successfully connected to database");
});

module.exports = db;
