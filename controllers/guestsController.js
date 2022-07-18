const db = require("../models");

const Guests = db.guests;

const newGuest = async (req, res) => {
  Guests.create({})
    .then((done) => {
      let guestId = [done.guestID];
      res.status(200).send(guestId);
    })
    .catch(function (err) {
      console.log(err);
      res.send("error occured");
    });
};

module.exports = {
  newGuest,
};
