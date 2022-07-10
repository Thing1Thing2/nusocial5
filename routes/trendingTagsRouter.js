const trendingTagsController = require("../controllers/trendingTagsController.js");

const trendingTagsRouter = require("express").Router();

trendingTagsRouter.post("/createTag", trendingTagsController.createTag);

module.exports = trendingTagsRouter;
