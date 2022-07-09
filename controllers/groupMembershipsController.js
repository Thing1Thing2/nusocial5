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
const GroupNames = db.groupNames;
const GroupMemberships = db.groupMemberships;

const joinGroup = async (req, res) => {
  await GroupNames.findOne({
    where: {
      groupName: req.body.groupName,
    },
  }).then((groupFound) => {
    if (groupFound) {
      GroupMemberships.create({
        username: req.body.username,
        groupName: req.body.groupName,
      })
        .then((result) => {
          res.status(200).send("Joined group");
        })
        .catch((err) => {
          console.log(err);
          res.status(200).send("error occurred");
        });
    } else {
      res.status(200).send("Entre valid groupName");
    }
  });
};

const leaveGroup = async (req, res) => {};

const gainAdminAccess = async (req, res) => {};

const getNumOfMembers = async (req, res) => {
  let num = 0;
  await GroupMemberships.findAll({
    where: {
      groupName: req.body.groupName,
    },
  }).then((count) => {
    console.log(count);
    console.log(count.length);
    num = count.length;
  });
  res.status(200).send("" + num);
};

module.exports = {
  joinGroup,
  leaveGroup,
  gainAdminAccess,
  getNumOfMembers,
};
