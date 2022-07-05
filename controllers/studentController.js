const db = require("../models");

const bcrypt = require("bcryptjs");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nusocial5",
  api_key: "829672847473966",
  api_secret: "EmSoixOPZ2b8u7Ot6xc1YR1oJmk",
});

// create main Model
const Student = db.students;
const Friends = db.friends;

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
  const file = req.files.photo;
  let imageURL;
  if (file) {
    cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
      imageURL = result.url;
      let username = req.body.username;

      Student.update(
        { profilePictureURL: result.url },
        { where: { username: username } }
      )
        .then(function (item) {
          res.status(200).send({
            success: true,
            result,
          });
        })
        .catch(function (err) {
          res.status(200).send("error occured");
        });
    });
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

module.exports = {
  addStudent,
  logoutStudent,
  findStudent,
  addProfilePicture,
  getProfilePicture,
};
