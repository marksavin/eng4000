var mysql = require("mysql");

// const pool = mysql.createPool({
//   connectionLimit: 1,
//   password: "1335969a",
//   user: "b43f5e001f1663",
//   database: "heroku_c2367af0e7c5fa1",
//   host: "us-cdbr-east-03.cleardb.com",
//   port: 3306,
// });

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "password",
  user: "root",
  database: "capstonedb",
  host: "localhost",
  port: 3306,
});

module.exports = pool;
