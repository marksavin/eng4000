const pool = require("../dbPool.js");

let adminApiCall = {};

adminApiCall.addPatient = (body) => {
  console.log(body);
  const fullName = `${body.fname} ${body.lname}`;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonedb.patient
      VALUES(?,?,?,?,?,?,?,?);`,
      [
        body.patient_id,
        fullName,
        body.dateOfBirth,
        body.admissionDate,
        body.weight,
        body.height,
        body.nurse_id,
        body.room_id,
      ],
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

adminApiCall.addNurse = (body, hashedPassword, user_type) => {
  const fullName = `${body.fname} ${body.lname}`;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonedb.login
      VALUES (?,?, CURRENT_DATE(),?, 0, 0);`,
      [body.token, hashedPassword, user_type],
      function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        pool.query(
          `INSERT INTO capstonedb.nurse
          VALUES(DEFAULT,?,?,?,?);`,
          [fullName, body.department, body.specialty, body.token],
          function (error, results, fields) {
            if (error) {
              return reject(error);
            }
            return resolve(results);
          }
        );
      }
    );
  });
};

adminApiCall.addPhysician = (body, hashedPassword, user_type) => {
  const fullName = `${body.fname} ${body.lname}`;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonedb.login
      VALUES (?,?, CURRENT_DATE(),?, 0, 0);`,
      [body.token, hashedPassword, user_type],
      function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        pool.query(
          `INSERT INTO capstonedb.physician
          VALUES(DEFAULT,?,?,?);`,
          [fullName, body.specialty, body.token],
          function (error, results, fields) {
            if (error) {
              return reject(error);
            }
            return resolve(results);
          }
        );
      }
    );
  });
};

adminApiCall.addFamily = (body, hashedPassword, user_type) => {};

module.exports = adminApiCall;
