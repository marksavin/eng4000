const pool = require("../dbPool.js");

let adminApiCall = {};

adminApiCall.addPatient = (body) => {
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

adminApiCall.addNurse = () => {
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

adminApiCall.addPhysician = () => {
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
