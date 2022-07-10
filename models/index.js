const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  charset: "utf8mb4",

  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//get all models
db.students = require("./studentsModel.js")(sequelize, DataTypes);
db.friends = require("./friendsModel.js")(sequelize, DataTypes);
db.posts = require("./postsModel.js")(sequelize, DataTypes);
db.comments = require("./commentsModel.js")(sequelize, DataTypes);
db.groupNames = require("./groupNamesModel.js")(sequelize, DataTypes);
db.groupMemberships = require("./groupMemberships.js")(sequelize, DataTypes);
db.personalchats = require("./personalChatsModel.js")(sequelize, DataTypes);
db.links = require("./linksModel.js")(sequelize, DataTypes);
db.testsanddeadlines = require("./testsAndDeadlinesModel.js")(
  sequelize,
  DataTypes
);
//associations
db.students.hasMany(db.friends, { foreignKey: "username" });
db.friends.belongsTo(db.students, { foreignKey: "username" });
db.friends.belongsTo(db.students, { foreignKey: "friend" }); //friends field must contain valid student names

db.posts.hasMany(db.comments, { foreignKey: "postID" });
db.comments.belongsTo(db.posts, { foreignKey: "postID" });

db.students.hasMany(db.groupMemberships, { foreignKey: "username" });
db.groupMemberships.belongsTo(db.students, { foreignKey: "username" });

db.friends.hasMany(db.personalchats, { foreignKey: "chatId" });

db.personalchats.belongsTo(db.friends, { foreignKey: "chatId" });

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});
module.exports = db;
