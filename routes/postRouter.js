
const postController = require('../controllers/postController')

const postRouter = require("express").Router();

postRouter.get("/allPosts", postController.getAllPosts);
postRouter.post("/addPost", postController.addPost);

module.exports = postRouter;
