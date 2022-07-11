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
const News = db.news;

const addNews = async (req, res) => {
  if (req.files) {
    if (req.files.coverImage) {
      const file = req.files.coverImage;
      let imageURL;
      cloudinary.uploader.upload(
        file.tempFilePath,
        async function (err, result) {
          imageURL = result.url;
          let title = req.body.title;
          let url = req.body.url;
          let createdBy = req.body.username;

          let info = {
            createdBy: createdBy,
            title: title,
            coverImage: imageURL,
            url: url,
          };
          News.create(info)
            .then(async function (item) {
              res.status(200).send("created news");
            })
            .catch(function (err) {
              res.status(200).send("error occured");
              console.log(err);
            });
        }
      );
    } else {
      res.status(200).send("check that image input is called coverImage");
    }
  } else {
    res.status(200).send("send an image");
  }
};

module.exports = {
  addNews,
};
