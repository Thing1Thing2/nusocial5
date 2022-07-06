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
const Student = db.students;
const Posts = db.posts;
const Friends = db.friends;
const GroupMemberships = db.groupMemberships;

const joinGroup = async (req, res) => {
  GroupMemberships.create({
    username: req.body.username,
    groupName: req.body.groupName,
  }).then((result) => {
    res.status(200).send("Joined group");
  });
};

const leaveGroup = async (req, res) => {};

const gainAdminAccess = async (req, res) => {};

module.exports = {
  joinGroup,
  leaveGroup,
  gainAdminAccess,
};
