const trendingTagsController = require("../controllers/trendingTagsController.js");

const trendingTagsRouter = require("express").Router();

trendingTagsRouter.post("/createTag", trendingTagsController.createTag);

trendingTagsRouter.post("/getTrending", trendingTagsController.getTrending);

module.exports = trendingTagsRouter;
