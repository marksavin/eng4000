const mysql = require("mysql");
const pool = require("../dbPool.js");
const bcrypt = require("bcrypt");

let loginApiCall = {};

loginApiCall.registerAccount = (token, hashedPassword, user_type) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonedb.login VALUES (?,?, CURRENT_DATE(),?, 0, 0)`,
      [token, hashedPassword, user_type],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

loginApiCall.resetPassword = (token, newPassword) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE capstonedb.login
      SET password = ?
      WHERE token = ?; `,
      [newPassword, token],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

//make sure the query is correct
loginApiCall.tokenExists = (token) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT token FROM capstonedb.login WHERE token = ? `,
      [token],
      (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.length == 0) {
          return resolve("User doesnt exist");
        } else if (result[0].token == token) {
          return resolve("User exist");
        }
      }
    );
  });
};

loginApiCall.accountAuthentication = (body) => {
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
              if (response && result[0].login_locked != 1) {
                return resolve(result);
              } else {
                const login_attempts = result[0].login_login_attempts;
                const login_attempts_reminaing =
                  result[0].login_login_attempts + 1;
                if (login_attempts < 3) {
                  pool.query(
                    `UPDATE capstonedb.login SET login_login_attempts = ? WHERE token = ?; `,
                    [login_attempts_reminaing, body.token.token],
                    (err, result) => {
                      if (err) {
                        return reject(err);
                      }
                      return resolve(
                        `Password is incorrect. ${
                          3 - login_attempts_reminaing
                        } attempt(s) remaining.`
                      );
                    }
                  );
                } else {
                  pool.query(
                    `UPDATE capstonedb.login SET login_locked = 1 WHERE token = ?; `,
                    [body.token.token, body.token.token],
                    (err, result) => {
                      if (err) {
                        return reject(err);
                      }
                      return resolve(
                        "Maximum of 3 login attempts reached. Please contact your administrator to restore access."
                      );
                    }
                  );
                }
              }
            }
          );
        } else {
          return resolve("User doesnt exist!");
        }
      }
    );
  });
};

module.exports = loginApiCall;
