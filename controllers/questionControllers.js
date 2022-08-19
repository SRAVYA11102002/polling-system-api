// importing Questions Controllers
const Questions = require("../models/questionModel");

// importing Option Controller
const Option = require("../models/OptionsModel");

//To create a question
module.exports.createQuestion = async function (req, res) {
  try {
    // creating the questions
    for (let title of req.body.title) {
      await Questions.create({ title });
    }
    // returning the resoponse
    return res.status(200).json({
      message: "question created succesfully",
    });
  } catch (err) {
    // checking for the error
    return res.status(465).json({
      message: "error in creating a questions",
      error: err.message,
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
      let option = await Option.findById(id);
      // checking whether option contains any votes or not
      if (option.votes > 0) {
        return res.status(401).json({
          message: "you cannot delete that option",
        });
      }
      // delete that particular option
      await option.remove();
    }
    // deleting the question
    await question.remove();
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
