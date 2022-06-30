const db = require('../models')
const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/dbConfig.js');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

// create main Model
const Chat = db.chats
const FriendsList = db.friendsList

// main work

// 1. create product

const addMsg = async (req, res) => {
    let info = {
        username : req.body.username,
        chat: req.body.chat,
        body: req.body.body
    }
    const chat = await Chat.create(info).then(function(item){
        res.status(200).send("successfully sent message")
        console.log("successfully sent msg");
      }).catch(function (err) {
        res.status(200).send("error occured")
        console.log(err);
      }); 
}



// 2. get all products

const getAllMsgs = async (req, res) => {

    let chats = await Chat.findAll({})
    res.status(200).send(chats)
}

// 3. Verify Chat

const verifyChat = async (req, res) => {
    let info = {
        chat: req.body.chat,
        username: req.body.username
    }
    const yourUsername  = info.username;
    const yourTable = yourUsername + "friends";
  
    const YourTable = sequelize.define(yourTable, {
        friendUsername: {
            type: DataTypes.STRING,
        }, 
        reqStatus:{
            type : DataTypes.STRING,
        },
        chatId: {
            type: DataTypes.STRING,
            unique: true,
        }
    });
    await YourTable.sync();
    //look for friend existence
    const friendsFound = await YourTable.count({ where: { friendUsername: info.chat, reqStatus: "confirm"}})
    console.log(friendsFound);
    if(friendsFound !== 0) {
        //now give them a chatId 
    let chatId = yourUsername + info.chat;
    YourTable.update({ chatId : chatId },{ where : { friendUsername : info.chat}});
    res.status(200).send(student)
        const Chat = sequelize.define(chatId, {
            username: {
                type: DataTypes.STRING,
            }, 
            chat : {
                type: DataTypes.STRING,
            },
            body: {
                type: DataTypes.STRING,
            }
        });
        await Chat.sync();
        res.status(200).send("passed")
    } else {
        res.status(200).send("failed")   
    }
}

module.exports = {
    addMsg,
    getAllMsgs,
    verifyChat
}
