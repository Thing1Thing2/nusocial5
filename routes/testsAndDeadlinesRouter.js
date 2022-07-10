const testsAndDeadlinesController = require("../controllers/testsAndDeadlinesController.js");

const testsAndDeadlinesRouter = require("express").Router();

testsAndDeadlinesRouter.post(
  "/createTag",
  testsAndDeadlinesController.createTag
);

module.exports = testsAndDeadlinesRouter;
