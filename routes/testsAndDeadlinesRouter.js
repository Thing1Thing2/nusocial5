const testsAndDeadlinesController = require("../controllers/testsAndDeadlinesController.js");

const testsAndDeadlinesRouter = require("express").Router();

testsAndDeadlinesRouter.post("/addTest", testsAndDeadlinesController.addTest);
testsAndDeadlinesRouter.post(
  "/addDeadline",
  testsAndDeadlinesController.addDeadline
);

module.exports = testsAndDeadlinesRouter;
