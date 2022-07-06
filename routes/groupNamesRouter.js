const groupNamesController = require("../controllers/groupNamesController.js");

const groupNamesRouter = require("express").Router();

groupNamesRouter.post("/addGroupName", groupNamesController.addGroup);

module.exports = groupNamesRouter;
