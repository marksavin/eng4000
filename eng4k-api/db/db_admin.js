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

        pool.query(
          `INSERT INTO capstonedb.treats_physician_patient
          VALUES(?,?);`,
          [body.patient_id, body.physician_id],
          (err, result) => {
            if (err) {
              return reject(err);
            }

            pool.query(
              `INSERT INTO capstonedb.sbar_note 
          VALUES(DEFAULT,CURRENT_TIMESTAMP(),?,?,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT, DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT, DEFAULT);`,
              [body.patient_id, body.nurse_id],
              function (error, results, fields) {
                if (error) {
                  return reject(error);
                }
                return resolve(results);
              }
            );
          }
        );
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

adminApiCall.unlockAccount = (token) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(*) AS count FROM capstonedb.login WHERE token = ?;`,
      [token],
      function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        if (results[0].count > 0) {
          pool.query(
            `UPDATE capstonedb.login SET login_login_attempts = 0, login_locked = 0 WHERE token = ?; `,
            [token],
            function (error, results, fields) {
              if (error) {
                return reject(error);
              }
              return resolve(
                `Successfully unlocked account with token ${token}!!`
              );
            }
          );
        } else {
          return resolve(`Account with token ${token} does not exist!!`);
        }
      }
    );
  });
};

module.exports = adminApiCall;
