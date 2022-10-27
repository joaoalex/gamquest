module.exports = {
  HOST: "dpg-cddfeqirrk07n4up7hj0-a",
  USER: "agile",
  PASSWORD: "",
  DB: "questionario",
  dialect: "postgres",
  port: '5432', //optional
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
