// importing Questions Controllers
const Questions = require("../models/questionModel");

// importing Option Controller
const Option = require("../models/OptionsModel");

//To create a question
module.exports.createQuestion = async function (req, res) {
  let isError = false;
  // creating a new question
  await Questions.create(req.body).catch((err) => {
    isError = true;
    // checking for the error
    return res.status(465).json({
      message: "error in creating a question",
    });
  });
  // returning the response
  if (!isError) {
    return res.status(200).json({
      message: "created succesfully",
    });
  }
};

//To delete a question
module.exports.deleteQuestion = async function (req, res) {
  try {
    // finding the particular Question
    const question = await Questions.findById(req.params.id);
    // deleting all the options related to that question
    for (let id of question.options) {
      await Option.findByIdAndDelete(id);
    }
    // deleting the question
    question.remove();
    // sending response
    return res.status(200).json({
      message: "question deleted succesfully",
    });
  } catch (err) {
    // checking for error
    return res.status(465).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

//To view a question and it’s options
module.exports.getQuestionDetails = async function (req, res) {
  try {
    // finding and populating the question
    const question = await Questions.findById(req.params.id).populate(
      "options"
    );
    // returning the response
    return res.status(200).json(question);
  } catch (err) {
    // checking for the errors
    return res.status(465).json({
      message: "internal server error",
      error: err.message,
    });
  }
};
