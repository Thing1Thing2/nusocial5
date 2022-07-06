const postsController = require("../controllers/postsController.js");

const postsRouter = require("express").Router();

postsRouter.post("/deletePost", postsController.deletePost);
postsRouter.post("/getAllPosts", postsController.getMyPosts);
postsRouter.post("/getFriendsPosts", postsController.getAllPosts);
postsRouter.post("/addPost", postsController.addPost);

module.exports = postsRouter;
