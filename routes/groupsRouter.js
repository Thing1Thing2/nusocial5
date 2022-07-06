const groupsController = require("../controllers/groupsController.js");

const groupsRouter = require("express").Router();

groupsRouter.post("/addGroup", groupsController.addGroup);

module.exports = groupsRouter;
