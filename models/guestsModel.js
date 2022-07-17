module.exports = (sequelize, DataTypes) => {
  const Guests = sequelize.define("guests", {
    guestID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
  });
  return Guests;
};
