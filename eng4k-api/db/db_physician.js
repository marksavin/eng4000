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
  console.log("db token", token);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT  C.patient_name, C.patient_id, B.s_problem, C.patient_room_id, B.r_priority, DATE_FORMAT(B.date_created, '%Y-%m-%d %H:%i:%s') AS  date_created, B.sbar_note_initial
        FROM (treats_physician_patient as A INNER JOIN sbar_note AS B ON A.treats_patient_id = B.note_patient_id) 
        INNER JOIN patient as C ON A.treats_patient_id = C.patient_id
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
