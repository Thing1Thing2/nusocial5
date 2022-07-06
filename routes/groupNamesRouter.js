const groupNamesController = require("../controllers/groupNamesController.js");

const groupNamesRouter = require("express").Router();

groupNamesRouter.post("/addGroupName", groupNamesController.addGroup);
groupNamesRouter.post("/allGroups", groupNamesController.allGroups);

module.exports = groupNamesRouter;
