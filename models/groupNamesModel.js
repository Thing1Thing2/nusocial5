module.exports = (sequelize, DataTypes) => {
  const GroupNames = sequelize.define("groupNames", {
    groupName: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    profilePictureURL: {
      type: DataTypes.STRING,
    },
    coverPictureURL: {
      type: DataTypes.STRING,
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return GroupNames;
};
