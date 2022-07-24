module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("posts", {
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  return Posts;
};
