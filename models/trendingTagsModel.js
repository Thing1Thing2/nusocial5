module.exports = (sequelize, DataTypes) => {
  const TrendingTags = sequelize.define("trendingtags", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    postsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  return TrendingTags;
};
