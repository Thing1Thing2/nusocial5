
const friendsListController = require('../controllers/friendsListController')

const friendsListRouter = require("express").Router();

friendsListRouter.get("/allFriends", friendsListController.getAllFriends);
friendsListRouter.post("/addFriend", friendsListController.addFriend);
friendsListRouter.post("/setChatId", friendsListController.setChatId);
module.exports = friendsListRouter;
