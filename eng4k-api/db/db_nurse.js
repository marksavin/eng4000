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
      `SELECT   p.patient_name, p.patient_id, sbar_note.a_problem, sbar_note.note_room_id, sbar_note.r_priority, sbar_note.date_created,
      CASE 
      WHEN 5 <= (timestampDIFF(HOUR,sbar_note.date_created, CURRENT_TIMESTAMP)) THEN 'Update Required'
      WHEN 5 > (timestampDIFF(HOUR,sbar_note.date_created, CURRENT_TIMESTAMP)) THEN 'Up to Date'
      END AS update_status  
      FROM sbar_note JOIN(
        SELECT k.date_created, note_id,note_room_id FROM sbar_note JOIN (
         SELECT max(date_created) AS date_created, note_patient_id
         FROM manage_nurse_note AS a JOIN sbar_note AS b ON a.manage_note_id = b.note_id 
         WHERE manage_by_nurse_id = ? GROUP BY note_patient_id) AS k ON sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id
         WHERE sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id) AS C JOIN patient AS p 
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
//NEED TO CHANGE NOTE ID TO AUTO INCREMENT ON MYSQL

nurseApiCalls.addNewSbar = (id, body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO capstonedb.sbar_note 
    (note_id, note_patient_id, note_room_id, date_created,s_problem, s_code_status, s_BP, s_pulse, s_respiration, s_temperature, s_o2, s_concern_bp, s_concern_pulse, s_concern_temp,
    s_concern_respiration, b_awareness_alert_oriented, b_awareness_confused_cooperative, b_awareness_non_coop_agit_combative, b_awareness_lethargic, b_awareness_stuporous, b_awareness_comatose, b_skin_warm_dry, b_skin_pale, b_skin_mottled, b_skin_diaphoretic, b_skin_extremities_cold,b_skin_extremities_warm, b_o2_time, b_oximeter_detection, a_problem, a_problem_cardiac,
    a_problem_infection, a_problem_neurologic, a_problem_respitory, a_problem_unsure_deterioriating,a_unstable, a_arrest, r_request, r_priority, r_patient_family_code_status, r_test_needed,
    r_change_treatment_ordered, r_freq_vital_signs, r_time_problem_will_last, r_problem_persist_contact)

    VALUES(DEFAULT,?,?,CURRENT_TIMESTAMP(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
      [
        body.note_patient_id,
        parseInt(body.note_room_id),
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

nurseApiCalls.SBARHistory = (patientId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT C.nurse_name, A.date_created, A.note_room_id, A.s_problem 
      FROM sbar_note AS A JOIN manage_nurse_note AS B  JOIN nurse AS C ON A.note_id = B. manage_note_id AND B.manage_by_nurse_id = C.nurse_id
      WHERE note_patient_id = ?
      ORDER BY date_created DESC;`,
      [patientId],
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
