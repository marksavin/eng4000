const mysql = require("mysql");
const pool = require("../dbPool.js");
const bcrypt = require("bcrypt");

// const pool = mysql.createPool({
//   connectionLimit: 1,
//   password: "1335969a",
//   user: "b43f5e001f1663",
//   database: "heroku_c2367af0e7c5fa1",
//   host: "us-cdbr-east-03.cleardb.com",
//   port: 3306,
// });

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   password: "password",
//   user: "root",
//   database: "capstonedb",
//   host: "localhost",
//   port: 3306,
// });

let loginApiCall = {};

loginApiCall.registerAccount = (token, hashedPassword, user_type) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonedb.login (token, password, date_created, user_type) VALUES (?,?, CURRENT_DATE(),?)`,
      [token, hashedPassword, user_type],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log(result);
        return resolve(result);
      }
    );
  });
};

loginApiCall.accountAuthentication = (body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM capstonedb.login WHERE token = ? `,
      [body.token],
      (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.length > 0) {
          bcrypt.compare(
            body.password,
            result[0].password,
            (error, response) => {
              if (response) {
                return resolve(result);
              } else {
                return resolve("password incorrect");
              }
            }
          );
        } else {
          return resolve("User doesnt exist");
        }
      }
    );
  });
};

module.exports = loginApiCall;
