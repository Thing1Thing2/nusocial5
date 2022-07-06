const db = require("../models");

const Comments = db.comments;
const Posts = db.posts;
students;
const deleteComment = async (req, res) => {};

const getCommentsForPost = async (req, res) => {
  var reqBody = req.body;
  Comments.findAll({
    where: {
      postID: reqBody.postID,
    },
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occurred");
    });
};

const addComment = (req, res) => {
  var reqBody = req.body;
  Posts.findOne({ where: { postID: req.body.postID } })
    .then((result) => {
      Comments.create({
        postID: reqBody.postID,
        body: reqBody.body,
        from: reqBody.from,
      })
        .then((result) => {
          res.status(200).send("Sent comment");
        })
        .catch((err) => {
          console.log(err);
          res.status(200).send("error occured");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("Unknown post");
    });
};

module.exports = {
  deleteComment,
  getCommentsForPost,
  addComment,
};
