const express = require("express");
const Questions = require("../models/questionModel");
const Option = require("../models/OptionsModel");
const questionController = require("../controllers/questionControllers");
const optionsController = require("../controllers/optionControllers");
const router = express.Router();

router.post("/questions/create", questionController.createQuestion);

router.post("/questions/:id/options/create", optionsController.addOption);

router.get("/questions/:id/delete", questionController.deleteQuestion);

router.get("/options/:id/add_vote", optionsController.incrementCount);

router.get("/questions/:id", questionController.getQuestionDetails);
module.exports = router;
