module.exports = {
  HOST: "dpg-cddfeqirrk07n4up7hj0-a",
  USER: "agile",
  PASSWORD: "tmtSQR1ZcnbXI7PC7OLJbvbcN3msXNtC",
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

//import * as pg from 'pg';
//import { Sequelize } from 'sequelize';

//const sequelize = new Sequelize('postgres://admin:admin@localhost:5432/mydb', {
//  dialectModule: pg
//});