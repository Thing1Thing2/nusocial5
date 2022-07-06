module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("comments", {
    commentID: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    postID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comments;
};
