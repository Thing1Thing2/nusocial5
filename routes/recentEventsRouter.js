const recentEventsController = require("../controllers/recentEventsController.js");

const recentEventsRouter = require("express").Router();

recentEventsRouter.post("/addEvent", recentEventsController.addEvent);

module.exports = recentEventsRouter;
