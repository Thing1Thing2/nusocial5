module.exports = (sequelize, DataTypes) => {
  const GroupMemberships = sequelize.define(
    "groupmemberships",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        //member or admin
        type: DataTypes.STRING,
        defaultValue: "member",
      },
      postsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      createdAt: "joiningDate",
    }
  );
  return GroupMemberships;
};
