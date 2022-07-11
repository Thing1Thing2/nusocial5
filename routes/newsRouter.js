const newsController = require("../controllers/newsController.js");

const newsRouter = require("express").Router();

newsRouter.post("/addNews", newsController.addNews);

module.exports = newsRouter;
