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



physicianApiCalls.getPatientList = (token) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT *
        FROM treats_physician_patient as A INNER JOIN sbar_note AS B ON A.treats_patient_id = B.note_patient_id
        WHERE treats_physician_id=?; `,
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
