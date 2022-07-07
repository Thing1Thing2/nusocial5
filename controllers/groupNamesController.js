const db = require("../models");

const { Op } = require("sequelize");
const sequelize = require("sequelize");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nusocial5",
  api_key: "829672847473966",
  api_secret: "EmSoixOPZ2b8u7Ot6xc1YR1oJmk",
});

const GroupNames = db.groupNames;
const GroupMemberships = db.groupMemberships;
const Students = db.students;

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

//get all groups you are not a member of
const allGroups = async (req, res) => {
  let stu = await Students.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (stu) {
    let groups = await GroupMemberships.findAll({
      attributes: ["groupName"],
      where: {
        username: req.body.username,
      },
    }).then((g) => {
      let arr = [];
      g.forEach((name) => {
        arr.push(name.groupName);
      });
      GroupNames.findAll({
        where: {
          groupName: { [Op.notIn]: arr },
        },
      })
        .then((filteredGroups) => {
          res.status(200).send(filteredGroups);
        })
        .catch((err) => {
          console.log(err);
          res.status(200).send("Error occurred");
        });
    });
  } else {
    res.status(200).send("no such student");
  }
};

module.exports = {
  addGroup,
  allGroups,
};
