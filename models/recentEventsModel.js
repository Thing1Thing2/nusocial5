module.exports = (sequelize, DataTypes) => {
  const RecentEvents = sequelize.define("recentevents", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: { type: DataTypes.STRING, allowNull: false },
    picture: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return RecentEvents;
};
