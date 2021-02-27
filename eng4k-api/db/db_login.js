const mysql = require("mysql");
const pool = require("../dbPool.js");
const bcrypt = require("bcrypt");

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
  console.log(body.token.token);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM capstonedb.login WHERE token = ? `,
      [body.token.token],
      (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.length > 0) {
          bcrypt.compare(
            body.password.password,
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
