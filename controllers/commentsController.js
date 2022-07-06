const db = require("../models");

const Comments = db.comments;
const Posts = db.posts;

const deleteComment = async (req, res) => {
  var reqBody = req.body;
  Comments.destroy({ where: { commentID: reqBody.commentID } })
    .then((postFound) => {
      //update comments count of post

      Posts.update(
        { commentsCount: parseInt(postFound.commentsCount) - 1 },
        {
          where: {
            postID: req.body.postID,
          },
        }
      )
        .then((done) => {
          res.status(200).send("Deleted comment");
        })
        .catch((err) => {
          console.log(err);
          res.status(200).send("error updating comments count");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("Error occurred");
    });
};

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
    .then((postFound) => {
      Comments.create({
        postID: reqBody.postID,
        body: reqBody.body,
        from: reqBody.from,
      })
        .then((result) => {
          //update Comments count of post
          Posts.update(
            { commentsCount: parseInt(postFound.commentsCount) + 1 },
            {
              where: {
                postID: req.body.postID,
              },
            }
          )
            .then((done) => {
              res
                .status(200)
                .send("added comment and updated comments count of post");
            })
            .catch((err) => {
              console.log(err);
              res.status(200).send("error updating comments count");
            });
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
