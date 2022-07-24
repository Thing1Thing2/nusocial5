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
const addPost = async (req, res) => {
  if (req.files) {
    if (req.files.image) {
      const file = req.files.image;
      let imageURL;
      cloudinary.uploader.upload(
        file.tempFilePath,
        async function (err, result) {
          imageURL = result.url;
          let username = req.body.username;
          let body = req.body.body;
          await Student.findOne({
            attributes: ["postsCount"],
            where: { username: username },
          }).then((postC) => {
            if (postC) {
              postsCountp1 = postC.postsCount + 1;
              console.log("updatedPostsCount is : " + postsCountp1);
              const title = req.body.title;
              let info = {
                from: username,
                title: title,
                postID: username + postsCountp1,
                body: body,
                image: imageURL,
              };
              Posts.create(info)
                .then(async function (item) {
                  Student.update(
                    { postsCount: postsCountp1 },
                    { where: { username: username } }
                  ).then((done) => {
                    res.status(200).send("added post");
                  });
                })
                .catch(function (err) {
                  res.status(200).send("error occured" + err + postsCountp1);
                });
            } else {
              res
                .status(200)
                .send(
                  "could not find information about your posts history to be able to update it"
                );
            }
          });
        }
      );
    } else {
      res.status(200).send("check that image input is called image");
    }
  } else {
    res.status(200).send("send an image");
  }
};

const deletePost = async (req, res) => {
  Posts.destroy({ where: { title: req.body.title, from: req.body.username } })
    .then((del) => {
      res.status(200).send("Deleted post");
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occurred");
    });
};
const getMyPosts = async (req, res) => {
  Posts.findAll({
    attributes: [
      "chatId",
      "message",
      "sentBy",
      [
        sequelize.fn(
          "DATE_FORMAT",
          sequelize.col("createdAt"),
          "%d-%m-%Y %H:%i:%s"
        ),
        "createdAt",
      ],
      "messageId",
    ],
    where: { from: req.body.username },
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occured");
    });
};
const getAllPosts = async (req, res) => {
  let username = req.body.username;
  let stu = await Student.findOne({
    where: {
      username: username,
    },
  });
  if (stu) {
    await Friends.findAll({
      attributes: ["username", "friend"],
      where: {
        reqStatus: "confirm",
        [Op.or]: [{ username: username }, { friend: username }],
      },
    }).then(async (friends) => {
      console.log("FRIENDS ARE: " + friends);
      let confirmed = friends.map((friend) => {
        if (friend.username === username) {
          return [friend.friend];
        } else {
          return [friend.username];
        }
      });
      confirmed.push(username);
      console.log("CONFIRMED ARE: " + confirmed);
      //finally got all confirmed friends in confirmed
      Posts.findAll({
        where: {
          from: confirmed,
        },
        order: [["createdAt", "DESC"]],
      })
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(200).send("error occurred");
        });
    });
  } else {
    res
      .status(200)
      .send("Create an account to make friends and see their posts");
  }
};
const addLike = async (req, res) => {
  Posts.findOne({ where: { postID: req.body.postID } }).then((post) => {
    Posts.update(
      { likesCount: parseInt(post.likesCount) + 1 },
      { where: { postID: req.body.postID } }
    )
      .then((result) => {
        res.status(200).send("added like");
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send("error occurred");
      });
  });
};
const removeLike = async (req, res) => {
  Posts.findOne({ where: { postID: req.body.postID } }).then((post) => {
    Posts.update(
      { likesCount: parseInt(post.likesCount) - 1 },
      { where: { postID: req.body.postID } }
    )
      .then((result) => {
        res.status(200).send("removed like");
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send("error occurred");
      });
  });
};
module.exports = {
  addPost,
  deletePost,
  getMyPosts,
  getAllPosts,
  addLike,
  removeLike,
};