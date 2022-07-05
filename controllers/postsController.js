const db = require("../models");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nusocial5",
  api_key: "829672847473966",
  api_secret: "EmSoixOPZ2b8u7Ot6xc1YR1oJmk",
});

// create main Model
const Student = db.students;
const Posts = db.posts;

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
    res.status(200).send("send and image");
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
  Posts.findAll({ where: { from: req.body.username } })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occured");
    });
};

const getFriendsPosts = async (req, res) => {
  res.status(200).send(helpers.getAllConfirmedFriends(req.body.username));
};

module.exports = {
  addPost,
  deletePost,
  getMyPosts,
  getFriendsPosts,
};
