const Option = require("../models/OptionsModel");
const Questions = require("../models/questionModel");
module.exports.addOption = async function (req, res) {
  try {
    const question = await Questions.findById(req.params.id);
    for (let option of req.body.options) {
      const currOption = await Option.create({
        text: option,
      });
      currOption.link_to_vote =
        "http://" + req.headers.host + "/options/" + option.id + "/add_vote";
      currOption.save();
      question.options.push(currOption.id);
      question.save();
    }
    return res.status(200).json({
      message: "option added succesfully",
    });
  } catch (err) {
    return res.status(465).json({
      message: "internal server error",
      err: err.message,
    });
  }
};

module.exports.deleteOption = async function (req, res) {
  try {
    await Questions.updateOne(
      { options: { $in: req.params.id } },
      { $pull: { options: { $eq: req.params.id } } }
    );
    await Option.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "option deleted succesfully",
    });
  } catch (err) {
    return res.status(465).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

module.exports.incrementVotes = async function (req, res) {
  try {
    const option = await Option.findById(req.params.id);
    option.votes += 1;
    await option.save();
    return res.status(200).json({
      message: "vote added",
      votes: option.votes,
    });
  } catch (err) {
    res.status(465).json({
      message: "could not increment the count",
      err: "internal server error",
    });
  }
};
