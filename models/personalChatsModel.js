module.exports = (sequelize, DataTypes) => {
  const PersonalChats = sequelize.define("personalchats", {
    messageID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sentBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return PersonalChats;
};
