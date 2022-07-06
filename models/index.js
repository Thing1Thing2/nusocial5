const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
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

//associations
db.students.hasMany(db.friends, { foreignKey: "username" });
db.friends.belongsTo(db.students, { foreignKey: "username" });
db.friends.belongsTo(db.students, { foreignKey: "friend" });
db.posts.hadMany(db.comments, { foreignKey: "postID" });
db.comments.belongsTo(db.posts, { foreignKey: "postID" });

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});
module.exports = db;
