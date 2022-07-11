const db = require("../models");
var cloudinary = require("cloudinary").v2;

const { Op } = require("sequelize");
const sequelize = require("sequelize");

cloudinary.config({
  cloud_name: "nusocial5",
  api_key: "829672847473966",
  api_secret: "EmSoixOPZ2b8u7Ot6xc1YR1oJmk",
});

// create main Model
const RecentEvents = db.recentevents;

const addEvent = async (req, res) => {
  if (req.files) {
    if (req.files.image) {
      const file = req.files.image;
      let imageURL;
      cloudinary.uploader.upload(
        file.tempFilePath,
        async function (err, result) {
          imageURL = result.url;
          let eventName = req.body.eventName;
          let date = req.body.date;
          let time = req.body.time;
          let url = req.body.url;
          let createdBy = req.body.username;

          let info = {
            eventName: eventName,
            date: date,
            time: time,
            url: url,
            image: imageURL,
            createdBy: createdBy,
          };
          RecentEvents.create(info)
            .then(async function (item) {
              res.status(200).send("created event");
            })
            .catch(function (err) {
              res.status(200).send("error occured");
              console.log(err);
            });
        }
      );
    } else {
      res.status(200).send("check that image input is called image");
    }
  } else {
    res.status(200).send("send an image");
  }
};

module.exports = {
  addEvent,
};
