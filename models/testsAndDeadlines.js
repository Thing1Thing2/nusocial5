module.exports = (sequelize, DataTypes) => {
  const TestsAndDeadlines = sequelize.define("testsAndDeadlines", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    module: { type: DataTypes.STRING, allowNull: false },
    type: {
      //test or deadline
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: { type: DataTypes.STRING, allowNull: false },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return TestsAndDeadlines;
};
