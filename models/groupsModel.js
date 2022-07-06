module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define(
    "groups",
    {
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
    },
    {
      createdAt: "registeredAt",
      updatedAt: "modifiedAt",
    }
  );
  return Groups;
};
