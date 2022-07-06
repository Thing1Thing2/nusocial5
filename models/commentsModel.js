module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("comments", {
    postID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
