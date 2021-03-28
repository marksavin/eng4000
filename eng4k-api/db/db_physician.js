const mysql = require("mysql");

const pool = require("../dbPool.js");

let physicianApiCalls = {};

physicianApiCalls.getId = (token) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT physician_id, physician_name
        FROM physician
        WHERE physician_token=?; `,
      [token],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

module.exports = physicianApiCalls;
