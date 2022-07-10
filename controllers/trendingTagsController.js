const db = require("../models");

const { Op } = require("sequelize");
const sequelize = require("sequelize");

const TrendingTags = db.trendingtags;

const verifyTag = (tag) => {
  return tag.startsWith("#") && tag !== "#";
};
const createTag = async (req, res) => {
  const tagVerified = verifyTag(req.body.tag);
  if (tagVerified) {
  } else {
    res
      .status(200)
      .send(
        "Send a valid tag starting with # and containing at least one character"
      );
  }

  TrendingTags.create({
    tag: req.body.tag,
  })
    .then((result) => {
      res.status(200).send("Created tag");
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occurred");
    });
};

module.export = {
  createTag,
};
