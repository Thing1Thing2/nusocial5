const linksController = require("../controllers/linksController.js");

const linksRouter = require("express").Router();

linksRouter.post("/deleteLink", linksController.deleteLink);
linksRouter.post("/addLink", linksController.addLink);
linksRouter.get("/getLinks", linksController.getLinks);
module.exports = linksRouter;
