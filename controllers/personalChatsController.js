const db = require("../models");

const { Op } = require("sequelize");
const sequelize = require("sequelize");

// create main Model
const PersonalChats = db.personalchats;

const addMessage = async (req, res) => {
  PersonalChats.create({
    chatId: req.body.chatId,
    message: req.body.message,
    sentBy: req.body.sentBy,
  })
    .then((result) => {
      res.status(200).send("added message");
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occurred");
    });
};

const deleteMessage = async (req, res) => {
  PersonalChats.destroy({
    where: {
      chatId: req.body.chatId,
      message: req.body.message,
      sentBy: req.body.sentBy,
    },
  })
    .then((result) => {
      res.status(200).send("deleted message");
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error occurred");
    });
};

const getAllMessages = async (req, res) => {
  PersonalChats.findAll({
    where: {
      chatId: req.body.chatId,
    },
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error loading chats");
    });
};

const latestMessage = async (req, res) => {
  PersonalChats.findOne({
    attributes: ["message"],
    where: {
      chatId: req.body.chatId,
    },
    order: [["createdAt", "DESC"]],
  })
    .then((result) => {
      res.status(200).send(result.message);
    })
    .catch((err) => {
      console.log(err);
      res.status(200).send("error loading chats");
    });
};

module.exports = {
  addMessage,
  deleteMessage,
  getAllMessages,
  latestMessage,
};
