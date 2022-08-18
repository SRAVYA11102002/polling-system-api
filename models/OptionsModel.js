const mongoose = require("mongoose");

const Options = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: false,
    default: 0,
  },
  link_to_vote: {
    type: String,
    required: false,
    default: "",
  },
});

const Option = mongoose.model("Option", Options);
module.exports = Option;
