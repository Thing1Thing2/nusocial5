const newsController = require("../controllers/newsController.js");

const newsRouter = require("express").Router();

newsRouter.post("/addNews", newsController.addNews);
newsRouter.post("/getNews", newsController.getNews);

module.exports = newsRouter;
