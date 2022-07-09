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
    num = count.length;
  });
  res.status(200).send("" + num);
};

const isAdmin = async (req, res) => {
  await GroupMemberships.findOne({
    where: {
      groupName: req.body.groupName,
      username: req.body.username,
    },
  }).then((count) => {
    res.status(200).send(count);
  });
};

const addBio = async (req, res) => {
  await GroupMemberships.findOne({
    where: {
      username: req.body.username,
      groupName: req.body.groupName,
      type: "admin",
    },
  }).then((admin) => {
    if (admin) {
      admin
        .update({
          description: req.body.description,
          where: {
            groupName: req.body.groupName,
          },
        })
        .then((result) => {
          res.status(200).send("Added bio");
        })
        .catch((err) => {
          console.log(err);
          res.status(200).send("error occurred");
        });
    } else {
      res.status(200).send("You do not have to rights to change this group");
    }
  });
};

const addCoverPicture = async (req, res) => {
  if (req.files) {
    if (req.files.photo) {
      const file = req.files.photo;
      let imageURL;
      cloudinary.uploader.upload(
        file.tempFilePath,
        async function (err, result) {
          imageURL = result.url;
          let groupName = req.body.groupName;

          await GroupNames.update(
            { coverPictureURL: imageURL },
            { where: { groupName: groupName } }
          )
            .then(function (item) {
              res.status(200).send("Added picture");
            })
            .catch(function (err) {
              res.status(200).send("error occured");
            });
        }
      );
    } else {
      res.status(200).send("make sure you send a photo");
    }
  } else {
    res.status(200).send("send an image");
  }
};

const changeProfilePicture = async (req, res) => {
  if (req.files) {
    if (req.files.photo) {
      const file = req.files.photo;
      let imageURL;
      cloudinary.uploader.upload(
        file.tempFilePath,
        async function (err, result) {
          imageURL = result.url;
          let groupName = req.body.groupName;

          await GroupNames.update(
            { profilePictureURL: imageURL },
            { where: { groupName: groupName } }
          )
            .then(function (item) {
              res.status(200).send("Added picture");
            })
            .catch(function (err) {
              res.status(200).send("error occured");
            });
        }
      );
    } else {
      res.status(200).send("make sure you send a photo");
    }
  } else {
    res.status(200).send("send an image");
  }
};

module.exports = {
  joinGroup,
  leaveGroup,
  gainAdminAccess,
  getNumOfMembers,
  isAdmin,
  addBio,
  addCoverPicture,
  changeProfilePicture,
};
