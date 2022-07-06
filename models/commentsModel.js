module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("comments", {
    commentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    postID: {
      type: DataTypes.STRING,
      allowNull: false,
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
