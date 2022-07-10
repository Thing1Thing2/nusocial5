const { sequelize } = require("../models");
const db = require("../models");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nusocial5",
  api_key: "829672847473966",
  api_secret: "EmSoixOPZ2b8u7Ot6xc1YR1oJmk",
});

const Links = db.links;

const deleteLink = async (req, res) => {
  Links.destroy({
    where: {
      createdBy: req.body.username,
      info: req.body.info,
      link: req.body.link,
    },
  })
    .then((result) => {
      res.status(200).send("deleted link");
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occured");
    });
};

const verifyLink = (link) => {
  return link !== "" && link !== " ";
};

const addLink = async (req, res) => {
  if (verifyLink(req.body.link)) {
    if (req.files) {
      if (req.files.image) {
        const file = req.files.image;
        let imageURL;
        cloudinary.uploader
          .upload(file.tempFilePath, async function (err, result) {
            imageURL = result.url;
            Links.create({
              link: req.body.link,
              createdBy: req.body.username,
              image: imageURL,
              info: req.body.info,
            })
              .then((result) => {
                res.status(200).send("created link");
              })
              .catch((err) => {
                console.log(err);
                res.status(200).send("error occured");
              });
          })
          .catch(function (err) {
            console.log(err);
            res.status(200).send("error occured");
          });
      }
    } else {
      res.status(200).send("check that image input is called image");
    }
  } else {
    res.status(200).send("Entre a valid link");
  }
};

const getLinks = async (req, res) => {
  Links.findAll().then((result) => {
    res.status(200).send(result);
  });
};

module.exports = {
  addLink,
  deleteLink,
  getLinks,
};
