const postsController = require("../controllers/postsController.js");

const postsRouter = require("express").Router();

postsRouter.post("/deletePost", postsController.deletePost);
postsRouter.post("/getMyPosts", postsController.getMyPosts);
postsRouter.post("/getAllPosts", postsController.getAllPosts);
postsRouter.post("/addPost", postsController.addPost);

module.exports = postsRouter;
