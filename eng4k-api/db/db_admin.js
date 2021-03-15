const pool = require("../dbPool.js");

let adminApiCall = {};

adminApiCall.addPatient = (body) => {
  const fullName = `${body.fname} ${body.lname}`;
  const dateOfBirth = `${body.dOBYear}-${body.dOBMonth}-${body.dOBDay}`;
  const admissionDate = `${body.today_year}-${body.today_month}-${body.today_day}`;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonedb.patient
      VALUES(?,?,?,?,?,?,?,?);`,
      [
        body.id,
        fullName,
        dateOfBirth,
        admissionDate,
        body.weight,
        body.height,
        body.nurse_id,
        body.patient_room_id,
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

adminApiCall.addNurse = (body) => {
  const fullName = `${body.fname} ${body.lname}`;
  return new Promise((resolve, reject) => {
    pool
      .query("begin")
      .then((res) => {
        return pool.query(
          `INSERT INTO capstonedb.nurse
      VALUES(DEFUALT,?,?,?,?);`,
          [fullName, body.department, body.specialty, body.token]
        );
      })
      .then((res) => {
        return pool.query(
          `INSERT INTO capstone.login
      VALUES(?,?,CURRENT_TIMESTAMP(), "nurse" ,0,0);`,
          [body.token, body.password]
        );
      })
      .then((res) => {
        // once that's done, run the commit statement to
        // complete the transaction
        return client.query("commit");
      })
      .then((res) => {
        // if the transaction completes successfully
        // log a confirmation statement
        console.log("transaction completed");
        return resolve("completed");
      })
      .catch((err) => {
        // incase there are any errors encountered
        // rollback the transaction
        console.error("error while querying:", err);
        pool.query("rollback");
        return reject(err);
      })
      .catch((err) => {
        // incase there is an error when rolling back, log it
        console.error("error while rolling back transaction:", err);
      });
  });
};

adminApiCall.addPhysician = (body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonesdb.physician
      VALUES(DEFUALT,?,?,?);`,
      [],
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

adminApiCall.addFamily = () => {
  console.log("this is the body: ", body);
  return new Promise((resolve, reject) => {
    pool.query(``, [], (err, result) => {
      if (err) {
        return reject(err);
      }
      console.log(result);
      return resolve(result);
    });
  });
};

module.exports = adminApiCall;
