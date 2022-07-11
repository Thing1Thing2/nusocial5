const db = require("../models");

const bcrypt = require("bcryptjs");
const { posts, links } = require("../models");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nusocial5",
  api_key: "829672847473966",
  api_secret: "EmSoixOPZ2b8u7Ot6xc1YR1oJmk",
});

// create main Model
const Student = db.students;
const Friends = db.friends;
const News = db.news;
const Links = db.links;
const RecentEvents = db.recentevents;

// main work

// 1. create student
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

function containsNumer(str) {
  const numbers = /\d/;
  return numbers.test(str);
}
function validateUsername(str) {
  if (!containsSpecialChars(str)) {
    if (str !== "") {
      if (str.length > 5) {
        return "username is valid";
      } else {
        return "username must have more than 6 characters";
      }
    } else {
      return "Enter a username";
    }
  } else {
    return "username cannot contain special characters";
  }
}

function validateEmail(str) {
  if (str !== "") {
    const guardCode =
      !str.startsWith("@nus.edu.sg") &&
      !str.startsWith("@u.nus.edu") &&
      (str.endsWith("@nus.edu.sg") || str.endsWith("@u.nus.edu"));
    if (guardCode) {
      return "email is valid";
    } else {
      return "not a valid NUS email id";
    }
  } else {
    return "Enter  an email";
  }
}

function validatePassword(str) {
  if (str != "") {
    if (containsSpecialChars(str)) {
      if (containsNumer(str)) {
        if (
          password.toLowerCase() !== password &&
          password.toUpperCase() !== password
        ) {
          return "password is valid";
        } else {
          return "password must contain a mix of upper and lower case letters";
        }
      } else {
        return "password must contain numbers";
      }
    } else {
      return "Password must contain special characters";
    }
  } else {
    return "Enter a password";
  }
}

const addStudent = async (req, res) => {
  password = bcrypt.hashSync(req.body.password, 10);
  const usernameValid = validateUsername(req.body.username);
  if (usernameValid == "username is valid") {
    const emailValid = validateEmail(req.body.nus_email);
    if (emailValid === "email is valid") {
      const passwordValid = validatePassword(req.body.password);
      if (passwordValid === "password is valid") {
        let info = {
          username: req.body.username,
          nus_email: req.body.nus_email,
          password: password,
          friendTable: req.body.username + "friends",
        };
        try {
          await Student.findOne({ where: { username: info.username } }).then(
            async (stu) => {
              if (stu) {
                res.status(200).send("username is taken");
              } else {
                await Student.findOne({
                  where: { nus_email: info.nus_email },
                }).then(async (stu) => {
                  if (stu) {
                    res
                      .status(200)
                      .send(
                        "You cannot create more than one account with the same email"
                      );
                  } else {
                    Student.create(info);
                    res.status(200).send("successfully registered");
                  }
                });
              }
            }
          );
        } catch (err) {
          res.status(200).send("error adding student");
          console.log("error adding student: " + err);
        }
      } else {
        res.status(200).send(passwordValid);
      }
    } else {
      res.status(200).send(emailValid);
    }
  } else {
    res.status(200).send(usernameValid);
  }
};

// 9. get single student based on id and password

const findStudent = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let stu = await Student.findOne({ where: { username: username } });
  if (stu) {
    bcrypt.compare(password, stu.password).then((result) => {
      if (result) {
        stu.update({
          online: true,
        });
        res.status(200).send("successful login");
      } else {
        res.status(200).send("Incorrect password");
      }
    });
  } else {
    res.status(200).send("This username does not exist");
  }
};

// 10. Logout student

const logoutStudent = async (req, res) => {
  let username = req.body.username;
  let student = await Student.findOne({ where: { username: username } });
  if (student) {
    student
      .update({ online: false })
      .then(function (item) {
        res.status(200).send("successfully logged out");
      })
      .catch(function (err) {
        res.status(200).send("error occured");
        console.log(err);
      });
  } else {
    res.status(200).send("You are a guest or unauthorised user");
  }
};

const addProfilePicture = async (req, res, nexts) => {
  if (req.files) {
    if (req.files.photo) {
      const file = req.files.photo;
      let imageURL;
      cloudinary.uploader.upload(
        file.tempFilePath,
        async function (err, result) {
          imageURL = result.url;
          let username = req.body.username;

          await Student.update(
            { profilePictureURL: imageURL },
            { where: { username: username } }
          )
            .then(function (item) {
              res.status(200).send("Added picture");
            })
            .catch(function (err) {
              res.status(200).send("error occured");
            });
        }
      );
    } else {
      res.status(200).send("make sure you send a photo");
    }
  } else {
    res.status(200).send("send an image");
  }
};

const addCoverPicture = async (req, res) => {
  if (req.files) {
    if (req.files.photo) {
      const file = req.files.photo;
      let imageURL;
      cloudinary.uploader.upload(
        file.tempFilePath,
        async function (err, result) {
          imageURL = result.url;
          let username = req.body.username;

          await Student.update(
            { coverPictureURL: imageURL },
            { where: { username: username } }
          )
            .then(function (item) {
              res.status(200).send("Added picture");
            })
            .catch(function (err) {
              res.status(200).send("error occured");
            });
        }
      );
    } else {
      res.status(200).send("make sure you send a photo");
    }
  } else {
    res.status(200).send("send an image");
  }
};

const getProfilePicture = async (req, res) => {
  Student.findOne({
    attributes: ["profilePictureURL"],
    where: {
      username: req.body.username,
    },
  })
    .then((url) => {
      res.status(200).send(url.profilePictureURL);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occured");
    });
};

const getCoverPicture = async (req, res) => {
  Student.findOne({
    attributes: ["coverPictureURL"],
    where: {
      username: req.body.username,
    },
  })
    .then((url) => {
      res.status(200).send(url.coverPictureURL);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occured");
    });
};

const isOnline = async (req, res) => {
  Student.findOne({
    attributes: ["online"],
    where: {
      username: req.body.username,
    },
  })
    .then((stu) => {
      console.log(stu.online);
      res.status(200).send(stu.online);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("Error obtaining online status");
    });
};

const addBio = async (req, res) => {
  Student.update(
    { bio: req.body.bio },
    {
      where: {
        username: req.body.username,
      },
    }
  )
    .then((stu) => {
      res.status(200).send("Added bio");
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("Error adding bio");
    });
};

const getBio = async (req, res) => {
  Student.findOne({
    attributes: ["bio"],
    where: {
      username: req.body.username,
    },
  })
    .then((stu) => {
      res.status(200).send(stu.bio);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("Error obtaining bio");
    });
};

const albumPictures = async (req, res) => {
  let imgArray = [];
  let accountImages = await Student.findOne({
    attributes: ["profilePictureURL", "coverPictureURL"],
    where: {
      username: req.body.username,
    },
  });
  let profilePic = accountImages.profilePictureURL;
  let coverPic = accountImages.coverPictureURL;
  imgArray.push(profilePic);
  imgArray.push(coverPic);
  let postsImages = await posts.findAll({
    attributes: ["image"],
    where: {
      from: req.body.username,
    },
  });
  postsImages.forEach((pic) => {
    imgArray.push(pic.image);
  });
  let newsImages = await News.findAll({
    attributes: ["coverImage"],
    where: {
      createdBy: req.body.username,
    },
  });
  newsImages.forEach((pic) => {
    imgArray.push(pic.coverImage);
  });
  let linksImages = await links.findAll({
    attributes: ["image"],
    where: {
      createdBy: req.body.username,
    },
  });
  linksImages.forEach((pic) => {
    console.log(pic.image);
    imgArray.push(pic.image);
  });
  let eventsImages = await RecentEvents.findAll({
    attributes: ["image"],
    where: {
      createdBy: req.body.username,
    },
  });
  eventsImages.forEach((pic) => {
    imgArray.push(pic.image);
  });
  res.status(200).send(imgArray);
};

module.exports = {
  addStudent,
  logoutStudent,
  findStudent,
  addProfilePicture,
  getProfilePicture,
  isOnline,
  addCoverPicture,
  getCoverPicture,
  addBio,
  getBio,
  albumPictures,
};
