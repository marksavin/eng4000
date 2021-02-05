const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 1,
  password: "1335969a",
  user: "b43f5e001f1663",
  database: "heroku_c2367af0e7c5fa1",
  host: "us-cdbr-east-03.cleardb.com",
  port: 3306,
});

let nurseApiCalls = {};

// nurseApiCalls.currentPatientList = (id) => {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       `SELECT * FROM sbar_note JOIN(
//         SELECT k.date_created, note_id,note_room_id FROM sbar_note JOIN (
//          SELECT max(date_created) AS date_created, note_patient_id
//          FROM manage_nurse_note AS a JOIN sbar_note AS b ON a.manage_note_id = b.note_id
//          WHERE manage_by_nurse_id = ? GROUP BY note_patient_id) AS k ON sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id
//          WHERE sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id) AS c JOIN patient AS p
//          ON sbar_note.date_created = C.date_created AND sbar_note.note_id = C.note_id AND p.patient_id = sbar_note.note_patient_id
//       WHERE sbar_note.date_created = C.date_created AND sbar_note.note_id = C.note_id;`,
//       [id],
//       (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         console.log(result);
//         return resolve(result);
//       }
//     );
//   });
// };

nurseApiCalls.currentPatientList = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT   p.patient_name, sbar_note.a_problem, sbar_note.note_room_id, sbar_note.r_priority,
      CASE 
      WHEN 5 <= (timestampDIFF(HOUR,sbar_note.date_created, CURRENT_TIMESTAMP)) THEN 'Update Required'
      WHEN 5 > (timestampDIFF(HOUR,sbar_note.date_created, CURRENT_TIMESTAMP)) THEN 'Up to Date'
      END AS update_status  
      FROM sbar_note JOIN(
        SELECT k.date_created, note_id,note_room_id FROM sbar_note JOIN (
         SELECT max(date_created) AS date_created, note_patient_id
         FROM manage_nurse_note AS a JOIN sbar_note AS b ON a.manage_note_id = b.note_id 
         WHERE manage_by_nurse_id = ? GROUP BY note_patient_id) AS k ON sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id
         WHERE sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id) AS c JOIN patient AS p 
         ON sbar_note.date_created = C.date_created AND sbar_note.note_id = C.note_id AND p.patient_id = sbar_note.note_patient_id
      WHERE sbar_note.date_created = C.date_created AND sbar_note.note_id = C.note_id;`,
      [id],
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

nurseApiCalls.addNewPatient = (body) => {
  const fullName = `${body.fname} ${body.lname}`;
  const dateOfBirth = `${body.dOBYear}-${body.dOBMonth}-${body.dOBDay}`;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO heroku_c2367af0e7c5fa1.patient (patient_id, patient_name, admission_date, patient_date_of_birth, patient_weight, patient_height)
      VALUES(defualt,?,defualt,?,?,?);`,
      [fullName, dateOfBirth, dateOfBirth, body.weight, body.height],
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

module.exports = nurseApiCalls;
