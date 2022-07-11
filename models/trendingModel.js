module.exports = (sequelize, DataTypes) => {
  const Trending = sequelize.define("trending", {
    eventID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Trending;
};
