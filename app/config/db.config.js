module.exports = {
  HOST: "localhost",
  USER: "agile",
  PASSWORD: "agile",
  DB: "agilequest",
  dialect: "mysql",
  port: '3306', //optional
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
