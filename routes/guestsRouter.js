const guestsController = require("../controllers/guestsController.js");

const guestsRouter = require("express").Router();

guestsRouter.post("/newGuest", guestsController.newGuest);

module.exports = guestsRouter;
