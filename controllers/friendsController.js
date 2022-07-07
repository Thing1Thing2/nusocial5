const db = require("../models");

const { Op } = require("sequelize");
const sequelize = require("sequelize");

// create main Model
const Student = db.students;
const Friends = db.friends;
const PersonalNewsAndNots = db.personalnewsandnots;

// main work

const addFriend = async (req, res) => {
  let friend = req.body.friend;
  let username = req.body.username;
  let info = {
    username: username,
    friend: friend,
    reqStatus: "pending",
    chatId: username + friend + "Chat",
    sentBy: username,
  };

  try {
    await Friends.findOne({
      where: {
        [Op.or]: [
          {
            username: info.username,
            friend: info.friend,
            reqStatus: "pending",
          },
          {
            username: info.friend,
            friend: info.username,
            reqStatus: "confirm",
          },
        ],
      },
    }).then(async (stu) => {
      if (stu) {
        res.status(200).send("Friend request already sent once");
        s;
      } else {
        await Friends.findOne({
          where: {
            [Op.or]: [
              {
                username: info.username,
                friend: info.friend,
                reqStatus: "confirm",
              },
              {
                username: info.friend,
                friend: info.username,
                reqStatus: "confirm",
              },
            ],
          },
        }).then(async (stu) => {
          if (stu) {
            res.status(200).send("You are already friends with " + info.friend);
          } else {
            if (info.username === info.friend) {
              res.status(200).send("cannot send friend request to yourself");
            } else {
              Friends.create(info);
            }
          }
        });
      }
    });
  } catch (err) {
    console.log("error adding friend: " + err);
    res.status(200).sed("error occurs");
  }
};

const confirmFriend = async (req, res) => {
  let username = req.body.username;
  let friendName = req.body.friend;
  let friend = await Friends.findOne({
    where: { username: friendName, friend: username },
  });
  if (friend) {
    if (friend.reqStatus === "pending") {
      friend
        .update({ reqStatus: "confirm" })
        .then(async function (item) {
          await PersonalNewsAndNots.destroy({
            where: { from: friendName, to: username },
          });
          const info = {
            from: username,
            to: friendName,
            body: username + "confirmed your friend request",
          };
          PersonalNewsAndNots.create({ info })
            .then((response) => response.text())
            .then((msg) => {
              if (msg === "sent message") {
                res.status(200).send("confirmed friend");
              } else {
                res.status(200).send(msg);
              }
            });
        })
        .catch(function (err) {
          res.status(200).send("error occured");
          console.log(err);
        });
    } else {
      res.status(200).send("Already confirmed");
    }
  } else {
    res.status(200).send("No such friend request");
  }
};

const getAllStudentsNotFriends = async (req, res) => {
  let stu = await Student.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (stu) {
    let friends = await Friends.findAll({
      attributes: ["username", "friend"],
    });

    const f = friends
      .filter(
        (friend) =>
          friend.username === req.body.username ||
          friend.friend === req.body.username
      )
      .map((friend) => {
        if (friend.username === req.body.username) {
          return friend.friend;
        } else {
          return friend.username;
        }
      });
    f.push(req.body.username);
    const filteredStudents = await Student.findAll({
      attributes: ["username"],
      where: {
        username: { [Op.notIn]: f },
      },
    });
    res.status(200).send(filteredStudents);
  } else {
    res.status(200).send("Create an account to make friends");
  }
};

const getAllFriendRequestsPending = async (req, res) => {
  let username = req.body.username;
  let stu = await Student.findOne({
    where: {
      username: username,
    },
  });
  if (stu) {
    const pendingSent = await Friends.findAll({
      attributes: [
        "friend",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("createdAt"),
            "%d-%m-%Y %H:%i:%s"
          ),
          "createdAt",
        ],
      ],
      where: {
        reqStatus: "pending",
        username: username,
      },
    });
    const pendingReceived = await Friends.findAll({
      attributes: [
        "username",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("createdAt"),
            "%d-%m-%Y %H:%i:%s"
          ),
          "createdAt",
        ],
      ],
      where: {
        reqStatus: "pending",
        friend: username,
      },
    });
    let returnList = [];
    pendingSent.map((sent) => {
      returnList.push(["sent", sent.friend, sent.createdAt]);
    });
    pendingReceived.map((received) => {
      returnList.push(["received", received.username, received.createdAt]);
    });
    res.status(200).send(returnList);
  } else {
    res.status(200).send("Create an account to make friends");
  }
};

const getAllConfirmedFriends = async (req, res) => {
  let username = req.body.username;
  let stu = await Student.findOne({
    where: {
      username: username,
    },
  });
  if (stu) {
    const friends = await Friends.findAll({
      attributes: [
        "username",
        "friend",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("createdAt"),
            "%d-%m-%Y %H:%i:%s"
          ),
          "updatedAt",
        ],
      ],
      where: {
        reqStatus: "confirm",
        [Op.or]: [{ username: username }, { friend: username }],
      },
    });
    const confirmed = friends.map((friend) => {
      if (friend.username === username) {
        return [friend.friend, friend.updatedAt];
      } else {
        return [friend.username, friend.updatedAt];
      }
    });
    res.status(200).send(confirmed);
  } else {
    res.status(200).send("Create an account to make friends");
  }
};

module.exports = {
  addFriend,
  confirmFriend,
  getAllStudentsNotFriends,
  getAllFriendRequestsPending,
  getAllConfirmedFriends,
};
