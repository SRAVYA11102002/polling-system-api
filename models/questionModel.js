// requiring the mongoose library
const mongoose = require("mongoose");

// importing Option Model
const Option = require("./OptionsModel");

// creating a questions schema
const Question = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Option",
    },
  ],
});

// setting it as a Model
const Questions = mongoose.model("Questions", Question);

// Exporting Questions Model
module.exports = Questions;
