const dbConfig = require("../config/db.config.js");
const { Sequelize, Op } = require("sequelize");
const { pg } = require("pg");
/*
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
*/
const sequelize = new Sequelize('postgres://agile:tmtSQR1ZcnbXI7PC7OLJbvbcN3msXNtC@dpg-cddfeqirrk07n4up7hj0-a.oregon-postgres.render.com:5432/questionario?ssl=true', {
     dialectModule: pg
});


//PGPASSWORD=tmtSQR1ZcnbXI7PC7OLJbvbcN3msXNtC psql -h dpg-cddfeqirrk07n4up7hj0-a.oregon-postgres.render.com -U agile questionario

//const sequelize = new Sequelize('postgres://agile:tmtSQR1ZcnbXI7PC7OLJbvbcN3msXNtC@pg-cddfeqirrk07n4up7hj0-a:5432/mydb', {
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


db.teams = require("./teams.js")(sequelize, Sequelize);
db.questionario = require("./questionario.js")(sequelize, Sequelize);
db.vetores = require("./vetores.js")(sequelize, Sequelize);
db.respostas = require("./respostas.js")(sequelize, Sequelize);
db.roles = require("./roles.js")(sequelize, Sequelize);


module.exports = db;


