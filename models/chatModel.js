module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define("Chat", {
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
    return Chat;
};

