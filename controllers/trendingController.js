const db = require("../models");

const { Op } = require("sequelize");
const sequelize = require("sequelize");

const Trending = db.trending;
const Posts = db.posts;
const TrendingTags = db.trendingtags;

const verifyTag = (tag) => {
  return tag.startsWith("#") && tag !== "#";
};

const findTag = async (tag, eventID) => {
  let found = false;
  await TrendingTags.findOne({
    where: {
      tag: tag,
    },
  }).then(async (foundTag) => {
    if (foundTag) {
      await Trending.findOne({
        where: {
          tag: tag,
          eventID: eventID,
        },
      }).then((relationFound) => {
        if (!relationFound) {
          found = true;
        }
      });
    }
  });
  console.log(found);
  return found;
};

const verifyType = (type) => {
  return (
    type === "Post" || type === "News" || type === "Test" || type === "Deadline"
  );
};
const addTag = async (req, res) => {
  let guardCode =
    (await verifyTag(req.body.tag)) &&
    (await findTag(req.body.tag, req.body.eventID)) &&
    (await verifyType(req.body.type));
  if (guardCode) {
    if (req.body.type === "Post") {
      Posts.findOne({
        where: {
          postID: req.body.eventID,
        },
      }).then((foundPost) => {
        if (foundPost) {
          Trending.create({
            eventID: req.body.eventID,
            type: req.body.type,
            tag: req.body.tag,
          })
            .then((result) => {
              res.status(200).send("added tag");
            })
            .catch((err) => {
              console.log(err);
              res.status(200).send("error occurred");
            });
        } else {
          res.status(200).send("This post is not backed up");
        }
      });
    } else if (req.body.type === "Test" || req.body.type === "Deadline") {
      Trending.create({
        eventID: req.body.eventID,
        type: req.body.type,
        tag: req.body.tag,
      })
        .then((result) => {
          res.status(200).send("added tag");
        })
        .catch((err) => {
          console.log(err);
          res.status(200).send("error occurred");
        });
    }
  } else {
    res.status(200).send("Send a valid tag or eventID");
  }
};

module.exports = {
  addTag,
};
