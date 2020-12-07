const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "password",
  user: "root",
  database: "capstonedb",
  host: "localhost",
  port: 3306,
});

let nurseApiCalls = {};
