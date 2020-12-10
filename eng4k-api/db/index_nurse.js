const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "password",
  user: "root",
  database: "capstonedb",
  host: "localhost",
  port: 3306,
});

let nurseApiCalls = {};


nurseApiCalls.currentPatientList = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM sbar_note JOIN(
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


module.exports = nurseApiCalls;