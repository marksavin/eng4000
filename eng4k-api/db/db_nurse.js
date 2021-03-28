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
      `SELECT A.note_patient_id, B.patient_name, A.a_problem, B.patient_room_id, A.r_priority,  DATE_FORMAT(A.date_created, '%Y-%m-%d %H:%i:%s') AS  date_created, A.sbar_note_initial,
      CASE 
      WHEN 5 <= (timestampDIFF(HOUR, A.date_created, CURRENT_TIMESTAMP)) OR A.sbar_note_initial = 1 THEN 'Update Required'
      WHEN 5 > (timestampDIFF(HOUR,A.date_created, CURRENT_TIMESTAMP)) AND A.sbar_note_initial = 0 THEN 'Up to Date'
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
      `UPDATE capstonedb.sbar_note
        SET 
        note_nurse_id = ?,
        s_problem = ?,
        s_code_status = ?,
        s_BP = ?,
        s_pulse = ?,
        s_respiration = ?,
        s_temperature = ?,
        s_o2 = ?,
        s_concern_bp = ?,
        s_concern_pulse = ?,
        s_concern_temp = ?,
        s_concern_respiration = ?,
        b_awareness_alert_oriented = ?,
        b_awareness_confused_cooperative = ?,
        b_awareness_non_coop_agit_combative = ?,
        b_awareness_lethargic = ?,
        b_awareness_stuporous = ?,
        b_awareness_comatose = ?,
        b_skin_warm_dry = ?,
        b_skin_pale = ?,
        b_skin_mottled = ?,
        b_skin_diaphoretic = ?,
        b_skin_extremities_cold = ?,
        b_skin_extremities_warm = ?,
        b_o2_percent = ?,
        b_o2_time = ?,
        b_oximeter_detection = ?,
        a_problem = ?,
        a_problem_cardiac = ?,
        a_problem_infection = ?,
        a_problem_neurologic = ?,
        a_problem_respitory = ?,
        a_problem_unsure_deterioriating = ?,
        a_unstable = ?,
        a_arrest = ?,
        r_request = ?,
        r_priority = ?,
        r_patient_family_code_status = ?,
        r_test_needed = ?,
        r_freq_vital_signs = ?,
        r_time_problem_will_last = ?,
        r_problem_persist_contact = ?,
        sbar_note_initial =  0
        WHERE note_patient_id = ?;`,
      [
        body.note_nurse_id,
        body.s_problem,
        body.s_code_status,
        body.s_BP,
        body.s_pulse,
        body.s_respiration,
        body.s_temperature,
        `${body.s_o2} %`,
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
        `${body.b_o2_percent} %`,
        `${body.b_o2_time} hours`,
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
        body.r_freq_vital_signs,
        body.r_time_problem_will_last,
        body.r_problem_persist_contact,
        body.note_patient_id,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log("first query", body.note_patient_id);
        pool.query(
          `SELECT A.patient_name, A.patient_date_of_birth, B.treats_physician_id, A.patient_room_id 
          FROM patient as A INNER JOIN treats_physician_patient as B ON A.patient_id = B.treats_patient_id 
          WHERE B.treats_patient_id =?;`,
          [body.note_patient_id],
          (error, results, fields) => {
            if (error) {
              return reject(error);
            }
            console.log("These are the results: ", results);
            pool.query(
              `INSERT INTO capstonedb.sbar_note_archive
              VALUES(CURRENT_TIMESTAMP(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
              [
                body.note_patient_id,
                results[0].patient_name,
                results[0].patient_date_of_birth,
                body.note_nurse_id,
                results[0].treats_physician_id,
                results[0].patient_room_id,
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
                `${body.b_o2_percent} %`,
                `${body.b_o2_time} hours`,
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
                body.r_freq_vital_signs,
                body.r_time_problem_will_last,
                body.r_problem_persist_contact,
              ],
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

nurseApiCalls.SBARHistory = (patientId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT A.sbar_note_archive_patient_name, A.sbar_note_archive_patient_id, B.nurse_name, DATE_FORMAT(A.sbar_note_archive_date_created, '%Y-%m-%d %H:%i:%s') AS sbar_note_archive_date_created,  A.sbar_note_archive_room_id, A.s_problem
      FROM sbar_note_archive as A INNER JOIN nurse as B ON A.sbar_note_archive_nurse_id = B.nurse_id
      WHERE A.sbar_note_archive_patient_id = ?;`,
      [patientId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

nurseApiCalls.getSBARHistoryFields = (dateCreated, patientId) => {
  console.log(dateCreated);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT *
      FROM sbar_note_archive as A
      WHERE A.sbar_note_archive_date_created = ? AND  A.sbar_note_archive_patient_id = ?;`,
      [dateCreated, patientId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log("SBAR history fields:", result);
        return resolve(result);
      }
    );
  });
};

nurseApiCalls.getId = (token) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT nurse_id, nurse_name
      FROM nurse
      WHERE nurse_token=?; `,
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

nurseApiCalls.getPhysInfo = (patientId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT *
      FROM treats_physician_patient AS A INNER JOIN physician as B ON A.treats_physician_id = B.physician_id
      WHERE A.treats_patient_id=?;`,
      [patientId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

module.exports = nurseApiCalls;
