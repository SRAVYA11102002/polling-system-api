const Questions = require("../models/questionModel");
const Option = require("../models/OptionsModel");
const { options } = require("../routes");
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

module.exports.deleteQuestion = async function (req, res) {
  try {
    const question = await Questions.findById(req.params.id);
    for (let id of question.options) {
      await Option.findByIdAndDelete(id);
    }
    question.remove();
    return res.status(200).json({
      message: "question deleted succesfully",
    });
  } catch (err) {
    return res.status(465).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

module.exports.getQuestionDetails = async function (req, res) {
  try {
    const question = await Questions.findById(req.params.id).populate(
      "options"
    );
    return res.status(200).json(question);
  } catch (err) {
    return res.status(465).json({
      message: "internal server error",
      error: err.message,
    });
  }
};
