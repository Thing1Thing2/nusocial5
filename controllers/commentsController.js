const { sequelize } = require("../models");
const db = require("../models");

const Comments = db.comments;
const Posts = db.posts;

const deleteComment = async (req, res) => {
  const t = await sequelize.transaction();
  const commentExists = await Comments.findOne({
    where: { commentID: req.body.commentID, postID: req.body.postID },
  }).then((found) => {
    return found ? true : false;
  });

  console.log(commentExists);
  if (commentExists) {
    const commentCreatorCorrect = await Comments.findOne({
      where: { commentID: req.body.commentID, from: req.body.from },
    }).then((creator) => {
      return creator ? true : false;
    });
    console.log(commentCreatorCorrect);
    if (commentCreatorCorrect) {
      try {
        const deleteComment = await Comments.destroy(
          {
            where: { commentID: req.body.commentID },
          },
          { transaction: t }
        );
        const postFound = await Posts.findOne({
          where: {
            postID: req.body.postID,
          },
        });

        Posts.update(
          { commentsCount: parseInt(postFound.commentsCount) - 1 },
          {
            where: {
              postID: req.body.postID,
            },
          },
          { transaction: t }
        );
        await t.commit();
        res.status(200).send("success");
      } catch (error) {
        await t.rollback();
        res.status(200).send("Could not delete comment");
        console.log(error);
      }
    } else {
      res.status(200).send("You cannot delete this comment");
    }
  } else {
    res.status(200).send("This comment is not backed up yet");
  }
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
      res.status(200).send("failed");
    });
};

const addComment = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    await Comments.create(
      {
        postID: req.body.postID,
        body: req.body.body,
        from: req.body.from,
      },
      { transaction: t }
    );
    const postFound = await Posts.findOne({
      where: {
        postID: req.body.postID,
      },
    });

    const num = postFound.commentsCount + 1;
    Posts.update(
      { commentsCount: num },
      {
        where: {
          postID: req.body.postID,
        },
      },
      { transaction: t }
    );
    console.log("done");
    res.status(200).send("success");
    console.log("waiting commit");
    await t.commit();
  } catch (err) {
    await t.rollback();
  }
};

module.exports = {
  deleteComment,
  getCommentsForPost,
  addComment,
};
