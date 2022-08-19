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
  const question = await Questions.findById(
    req.params.id,
    async function (err, data) {
      if (err) {
        return res.status(465).json({
          message: "error in deleting the question",
        });
      }
      for (let id of data.options) {
        await Option.findByIdAndDelete(id, function (err, data) {
          if (err) {
            return res.status(465).json({
              message: "error in deleting the question",
            });
          }
        });
      }
      await question.remove();
    }
  );
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
