const mysql = require("mysql");

const pool = require("../dbPool.js");

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
      `SELECT A.note_patient_id, B.patient_name, A.a_problem, B.patient_room_id, A.r_priority, A.date_created,
      CASE 
      WHEN 5 <= (timestampDIFF(HOUR, A.date_created, CURRENT_TIMESTAMP)) THEN 'Update Required'
      WHEN 5 > (timestampDIFF(HOUR,A.date_created, CURRENT_TIMESTAMP)) THEN 'Up to Date'
      END AS update_status  
      FROM
      sbar_note as A INNER JOIN patient as B ON A.note_patient_id = B.patient_id
      WHERE A.note_nurse_id = ?;`,
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
//NEED TO CHANGE NOTE ID TO AUTO INCREMENT ON MYSQL

nurseApiCalls.addNewSbar = (id, body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonedb.sbar_note 
      VALUES(DEFAULT,CURRENT_TIMESTAMP(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
      [
        body.note_patient_id,
        body.note_nurse_id,
        body.s_problem,
        body.s_code_status,
        body.s_BP,
        body.s_pulse,
        body.s_respiration,
        body.s_temperature,
        `${body.s_o2} mmHg`,
        body.s_concern_bp,
        body.s_concern_pulse,
        body.s_concern_temperature,
        body.s_concern_respiration,
        body.b_awareness_alert_oriented,
        body.b_awareness_confused_cooperative,
        body.b_awareness_non_coop_agit_combative,
        body.b_awareness_lethargic,
        body.b_awareness_stuporous,
        body.b_awareness_comatose,
        body.b_skin_warm_dry,
        body.b_skin_pale,
        body.b_skin_mottled,
        body.b_skin_diaphoretic,
        body.b_skin_extremities_cold,
        body.b_skin_extremities_warm,
        `${body.b_o2_time} mins`,
        body.b_oximeter_detection,
        body.a_problem,
        body.a_problem_cardiac,
        body.a_problem_infection,
        body.a_problem_neurologic,
        body.a_problem_respitory,
        body.a_problem_unsure_deterioriating,
        body.a_unstable,
        body.a_arrest,
        body.r_request,
        parseInt(body.r_priority),
        body.r_patient_family_code_status,
        body.r_test_needed,
        body.r_change_treatment_ordered,
        body.r_freq_vital_signs,
        body.r_time_problem_will_last,
        body.r_problem_persist_contact,
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

nurseApiCalls.SBARHistory = (nurseId, patientId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT *
      FROM sbar_note_archive as A
      WHERE A.sbar_note_archive_nurse_id = ? AND A.sbar_note_archive_patient_id=?; `,
      [nurseId, patientId],
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

nurseApiCalls.getId = (token) => {
  console.log("token", token.token);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT nurse_id
      FROM nurse
      WHERE nurse_token=?; `,
      [token],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log("this is the id", result);
        return resolve(result);
      }
    );
  });
};

module.exports = nurseApiCalls;
