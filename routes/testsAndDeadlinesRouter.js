const testsAndDeadlinesController = require("../controllers/testsAndDeadlinesController.js");

const testsAndDeadlinesRouter = require("express").Router();

testsAndDeadlinesRouter.post("/addTest", testsAndDeadlinesController.addTest);
testsAndDeadlinesRouter.post(
  "/removeTest",
  testsAndDeadlinesController.removeTest
);
testsAndDeadlinesRouter.post(
  "/addDeadline",
  testsAndDeadlinesController.addDeadline
);
testsAndDeadlinesRouter.post(
  "/deleteDeadline",
  testsAndDeadlinesController.deleteDeadline
);

module.exports = testsAndDeadlinesRouter;
