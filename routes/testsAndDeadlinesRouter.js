const testsAndDeadlinesController = require("../controllers/testsAndDeadlinesController.js");

const testsAndDeadlinesRouter = require("express").Router();

testsAndDeadlinesRouter.post(
  "/addTestOrDeadline",
  testsAndDeadlinesController.addTestOrDeadline
);
testsAndDeadlinesRouter.post(
  "/deleteTestOrDeadline",
  testsAndDeadlinesController.deleteTestOrDeadline
);

module.exports = testsAndDeadlinesRouter;
