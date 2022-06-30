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
const Student = db.students

const addFriend = async (req, res) => {
    const yourUsername = req.body.yourUsername;
    const yourTable = yourUsername + "friends";
    let info = {
        friendUsername: req.body.friendUsername,
        reqStatus: "pending",
    }
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
    const friendReq = await YourTable.create(info)
    res.status(200).send(friendReq)
    console.log(friendReq)
    let infoFriend = {
        friendUsername: yourUsername,
        reqStatus: "pending",
    }
    const friendTable = info.friendUsername + "friends";
    const FriendTable =  sequelize.define(friendTable, {
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
    await FriendTable.sync();
    const friendFriendReq = await FriendTable.create(infoFriend)
    console.log(friendFriendReq)
}

// 2. get all products

const getAllFriends = async (req, res) => {
    let friends = await FriendsList.findAll({})
    res.status(200).send(friends)
}

// 3. set Chat Table Id

const setChatId = async (req, res) => {
    let info = {
        friendUsername: req.body.chat,
    }
    const addChat = await FriendsList.create(info)
    res.status(200).send(friendReq)
}


module.exports = {
    addFriend,
    getAllFriends,
    setChatId
}
