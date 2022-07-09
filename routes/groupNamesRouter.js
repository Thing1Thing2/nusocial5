const groupNamesController = require("../controllers/groupNamesController.js");

const groupNamesRouter = require("express").Router();

groupNamesRouter.post("/addGroupName", groupNamesController.addGroup);
groupNamesRouter.post("/allGroups", groupNamesController.allGroups);
groupNamesRouter.post("/allMyGroups", groupNamesController.allMyGroups);
module.exports = groupNamesRouter;
