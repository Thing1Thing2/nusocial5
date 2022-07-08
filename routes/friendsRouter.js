const friendsController = require("../controllers/friendsController.js");

const friendsRouter = require("express").Router();

friendsRouter.post("/addFriend", friendsController.addFriend);
friendsRouter.post("/confirmFriend", friendsController.confirmFriend);
friendsRouter.post(
  "/getAllStudentsNotFriends",
  friendsController.getAllStudentsNotFriends
);
friendsRouter.post(
  "/getAllFriendRequestsPending",
  friendsController.getAllFriendRequestsPending
);
friendsRouter.post(
  "/getAllConfirmedFriends",
  friendsController.getAllConfirmedFriends
);
friendsRouter.post("/getChatId", friendsController.getChatId);
module.exports = friendsRouter;
