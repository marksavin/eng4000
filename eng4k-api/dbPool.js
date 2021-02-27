var mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 5,
  password: "w09f5gwhdtuzl74p",
  user: "doadmin",
  database: "capstonedb",
  host: "db-mysql-tor1-50668-do-user-4028610-0.b.db.ondigitalocean.com",
  port: 25060,
});

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   password: "password",
//   user: "root",
//   database: "capstonedb",
//   host: "localhost",
//   port: 3306,
// });

module.exports = pool;
