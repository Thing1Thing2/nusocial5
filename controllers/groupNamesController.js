const db = require("../models");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nusocial5",
  api_key: "829672847473966",
  api_secret: "EmSoixOPZ2b8u7Ot6xc1YR1oJmk",
});

const GroupNames = db.groupNames;

const verifyGroupName = (groupName) => {
  if (groupName === "") {
    return false;
  }
  return true;
};
const addGroup = async (req, res) => {
  if (verifyGroupName(req.body.groupName)) {
    if (req.files) {
      if (req.files.image) {
        const file = req.files.image;
        let imageURL;
        cloudinary.uploader.upload(
          file.tempFilePath,
          async function (err, result) {
            imageURL = result.url;
            GroupNames.create({
              groupName: req.body.groupName,
              description: req.body.description,
              profilePictureURL: imageURL,
            })
              .then(async function (item) {
                res.status(200).send("created group");
              })
              .catch(function (err) {
                console.log(err);
                res.status(200).send("error occured");
              });
          }
        );
      } else {
        res.status(200).send("check that image input is called image");
      }
    } else {
      res.status(200).send("send an image");
    }
  } else {
    res.status(200).send("Entre a valid group name");
  }
};

const allGroups = async (req, res) => {
  GroupNames.findAll().then((groups) => {
    res
      .status(200)
      .send(groups)
      .catch((err) => {
        console.log(err);
        res.status(200).send(err);
      });
  });
};

module.exports = {
  addGroup,
  allGroups,
};
