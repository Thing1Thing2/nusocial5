const trendingTagsController = require("../controllers/trendingTagsController.js");

const trendingTagsRouter = require("express").Router();

trendingTagsRouter.post("/deleteLink", linksController.deleteLink);
trendingTagsRouter.post("/addLink", linksController.addLink);
trendingTagsRouter.post("/getLinks", linksController.getLinks);
module.exports = trendingTagsRouter;
