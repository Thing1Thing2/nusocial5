const personalChatsController = require("../controllers/personalChatsController.js");

const personalChatsRouter = require("express").Router();

personalChatsRouter.post(
  "/deleteMessage",
  personalChatsController.deleteMessage
);

personalChatsRouter.post(
  "/getAllMessages",
  personalChatsController.getAllMessages
);
personalChatsRouter.post("/addMessage", personalChatsController.addMessage);
personalChatsRouter.post(
  "/latestMessage",
  personalChatsController.latestMessage
);

module.exports = personalChatsRouter;
