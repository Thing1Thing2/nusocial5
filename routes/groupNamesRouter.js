const groupNamesController = require("../controllers/groupNamesController.js");

const groupNamesRouter = require("express").Router();

groupNamesRouter.post("/addGroupName", groupNamesController.addGroup);
groupNamesRouter.post("/allGroups", groupNamesController.allGroups);
groupNamesRouter.post("/allMyGroups", groupNamesController.allMyGroups);
groupNamesRouter.post("/getGroupData", groupNamesController.getGroupData);
groupNamesRouter.post("/getPublicGroups", groupNamesController.getPublicGroups);

module.exports = groupNamesRouter;
