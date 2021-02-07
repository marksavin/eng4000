const mysql = require("mysql");

// const pool = mysql.createPool({
//   connectionLimit: 1,
//   password: "1335969a",
//   user: "b43f5e001f1663",
//   database: "heroku_c2367af0e7c5fa1",
//   host: "us-cdbr-east-03.cleardb.com",
//   port: 3306,
// });

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "password",
  user: "root",
  database: "capstonedb",
  host: "localhost",
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

nurseApiCalls.addNewSbar = (id, body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonedb.sbar_note 
      (note_id, note_patient_id, note_room_id, date_created, s_problem, s_code_status, s_BP,  s_pulse ,  s_respiration ,  s_temperature ,  s_o2 ,  s_concern_bp ,  s_concern_pulse ,  s_concern_temp ,  s_concern_respiration ,  b_awareness_alert_oriented ,  b_awareness_confused_cooperative ,  b_awareness_non_coop_agit_combative ,  b_awareness_lethargic ,  b_awareness_stuporous ,  b_awareness_comatose ,  b_skin_warm_dry ,  b_skin_pale ,  b_skin_mottled ,  b_skin_diaphoretic ,  b_skin_extremities_cold ,  b_skin_extremities_warm ,  b_o2_time ,  b_oximeter_detection ,  a_problem ,  a_problem_cardiac , a_problem_infection ,  a_problem_neurologic ,  a_problem_respitory ,  a_problem_unsure_deterioriating ,  a_unstable ,  a_arrest ,  r_request ,  r_priority ,  r_patient_family_code_status ,  r_test_needed ,  r_change_treatment_ordered ,  r_freq_vital_signs ,  r_time_problem_will_last ,  r_problem_persist_contact ,  physician_analysis )
      
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
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

nurseApiCalls.addNewPatient = (body) => {
  const fullName = `${body.fname} ${body.lname}`;
  const dateOfBirth = `${body.dOBYear}-${body.dOBMonth}-${body.dOBDay}`;
  const admissionDate = `${body.today_year}-${body.today_month}-${body.today_day}`;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO heroku_c2367af0e7c5fa1.patient (patient_id, patient_name, admission_date, patient_date_of_birth, patient_weight, patient_height)
      VALUES(defualt,?,?,?,?,?);`,
      [fullName, admissionDate, dateOfBirth, body.weight, body.height],
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
