module.exports = (sequelize, DataTypes) => {
    const Friends = sequelize.define("friends", {
        username : {
            type: DataTypes.STRING,
            allowNull: false
           }, 
           friend: {
            type: DataTypes.STRING,
            allowNull: false,
           },
           reqStatus:{
                type : DataTypes.STRING,
                allowNull: false
               },
               chatId: {
                   type: DataTypes.STRING,
                   unique: true,
                   allowNull: false,
                   primaryKey: true
               },
               sentBy: {
                   type: DataTypes.STRING,
               }
    });
    return Friends;
};
