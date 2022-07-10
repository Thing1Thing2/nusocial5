const db = require("../models");

const { Op } = require("sequelize");
const sequelize = require("sequelize");

const TrendingTags = db.trendingtags;

const verifyTag = (tag) => {
  return tag.startsWith("#") && tag !== "#";
};
const createTag = async (req, res) => {
  const tagVerified = verifyTag(tag);
  if (tagVerified) {
  } else {
    res
      .status(200)
      .send(
        "Send a valid tag starting with # and containing at least one character"
      );
  }

  TrendingTags.create({
    tag: "",
  });
};

module.export = {
  createTag,
};
