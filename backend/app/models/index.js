const dbConfig = require("../config/db.config.js");
const { Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = sequelize;

// // drop the table if it already exists
//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});

sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


db.quests = require("./quest.js")(sequelize, Sequelize);
db.questionario = require("./questionario.js")(sequelize, Sequelize);
db.vetores = require("./vetores.js")(sequelize, Sequelize);
db.respostas = require("./respostas.js")(sequelize, Sequelize);

module.exports = db;


