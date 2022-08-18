const Questions = require("../models/questionModel");
const Option = require("../models/OptionsModel");
module.exports.createQuestion = async function (req, res) {
  let isError = false;
  await Questions.create(req.body).catch((err) => {
    isError = true;
    return res.status(465).json({
      message: "error in creating a question",
    });
  });
  if (!isError) {
    return res.status(200).json({
      message: "created succesfully",
    });
  }
};
