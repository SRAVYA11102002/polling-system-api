const mongoose = require("mongoose");
const Option = require("./OptionsModel");
const Question = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Option",
    },
  ],
});

const Questions = mongoose.model("Questions", Question);
module.exports = Questions;
