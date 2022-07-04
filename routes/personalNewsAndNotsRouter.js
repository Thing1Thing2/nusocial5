const personalNewsAndNotsController =  require('../controllers/personalNewsAndNotsController.js');


const personalNewsAndNotsRouter = require("express").Router();


personalNewsAndNotsRouter.post("/addNews",personalNewsAndNotsController.addPersonalNewsAndNots);
personalNewsAndNotsRouter.post("/getNews",personalNewsAndNotsController.getPersonalNewsAndNots);

module.exports = personalNewsAndNotsRouter;
