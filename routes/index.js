// requiring express
const express = require("express");

// importing questionsControllers
const questionController = require("../controllers/questionControllers");

// importing optionsContronller
const optionsController = require("../controllers/optionControllers");

// initializing router
const router = express.Router();

//adding a route for creating a quetions
router.post("/questions/create", questionController.createQuestion);

// adding a route for creating options
router.post("/questions/:id/options/create", optionsController.addOption);

// adding a route for deleting an question
router.get("/questions/:id/delete", questionController.deleteQuestion);

// adding a route for deleting  an options
router.get("/options/:id/delete", optionsController.deleteOption);

// adding a route for increaing the vote for an option
router.get("/options/:id/add_vote", optionsController.incrementVotes);

// adding a route for getting the details of a particular question
router.get("/questions/:id", questionController.getQuestionDetails);

// exporting router
module.exports = router;
