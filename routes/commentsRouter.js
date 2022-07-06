const commentsController = require("../controllers/commentsController.js");

const commentsRouter = require("express").Router();

commentsRouter.post("/deletePost", commentsController.deleteComment);
commentsRouter.post("/getMyPosts", commentsController.getCommentsForPost);
commentsRouter.post("/addPost", commentsController.addComment);

module.exports = postsRouter;
