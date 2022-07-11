const recentEventsController = require("../controllers/recentEventsController.js");

const recentEventsRouter = require("express").Router();

recentEventsRouter.post("/addEvent", recentEventsController.addEvent);
recentEventsRouter.post("/getEvents", recentEventsController.getEvents);

module.exports = recentEventsRouter;
