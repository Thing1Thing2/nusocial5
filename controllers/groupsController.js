const db = require("../models");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nusocial5",
  api_key: "829672847473966",
  api_secret: "EmSoixOPZ2b8u7Ot6xc1YR1oJmk",
});

const Groups = db.groups;

const addGroup = async (req, res) => {};

module.exports = {
  addGroup,
};
