const trendingController = require("../controllers/trendingController.js");

const trendingRouter = require("express").Router();

trendingRouter.post("/addTag", trendingController.addTag);

module.exports = trendingRouter;
