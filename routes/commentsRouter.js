const commentsController = require("../controllers/commentsController.js");

const commentsRouter = require("express").Router();

commentsRouter.post("/deleteComment", commentsController.deleteComment);
commentsRouter.post(
  "/getCommentsForPost",
  commentsController.getCommentsForPost
);
commentsRouter.post("/addComment", commentsController.addComment);

module.exports = commentsRouter;
