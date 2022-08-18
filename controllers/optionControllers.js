const Option = require("../models/OptionsModel");
const Questions = require("../models/questionModel");
module.exports.addOption = async function (req, res) {
  const question = await Questions.findById(req.params.id);
  for (let i = 0; i < req.body.options.length; i++) {
    const option = await Option.create({
      text: req.body.options[i],
    });
    option.link_to_vote =
      "http://" + req.headers.host + "/options/" + option.id + "/add_vote";
    await option.save();
    question.options.push(option.id);
    await question.save();
  }
  return res.status(200).json({
    message: "options Created Succesfully",
  });
};
