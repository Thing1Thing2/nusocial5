module.exports = (sequelize, DataTypes) => {
  const Links = sequelize.define("links", {
    linkID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    link: { type: DataTypes.STRING, allowNull: false, unique: true },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Links;
};
