
const chatController = require('../controllers/chatController')

const chatRouter = require("express").Router();

chatRouter.get("/allMsgs", chatController.getAllMsgs);
chatRouter.post("/addMsg", chatController.addMsg);
chatRouter.post("/verifyChat", chatController.verifyChat);
module.exports = chatRouter;
