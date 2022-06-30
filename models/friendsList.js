module.exports = (sequelize, DataTypes) => {
    const FriendsList = sequelize.define("FriendsList", {
        friendUsername: {
            type: DataTypes.STRING,
        }, 
        reqStatus: {
            type : DataTypes.STRING,
        },
        chatId: {
            type: DataTypes.STRING,
            unique: true,
        }
    });
    return FriendsList;
};

//reStatus = confirm/pending/blocked/mute
