
/* show sbar notes that need updating for physician patients */
SELECT * FROM sbar_note JOIN(
	SELECT patient_id, MAX(date_created) AS tdate
	FROM sbar_note AS C JOIN(
		SELECT  patient_id, patient_name, patient_room_id 
		FROM patient AS a JOIN treats_physician_patient AS b ON a.patient_id = b.treats_patient_id
		WHERE b.treats_physician_id = 104)
	AS D ON C.note_patient_id = D.patient_id 
    GROUP BY patient_id) AS P ON (sbar_note.note_patient_id = P.patient_id AND sbar_note.date_created = P.tdate)
    HAVING 5 < (timestampDIFF(HOUR,date_created, CURRENT_TIMESTAMP));
    
    /* show latest info on physician patients */
    SELECT * FROM sbar_note JOIN(
	SELECT patient_id, MAX(date_created) AS tdate
	FROM sbar_note AS C JOIN(
		SELECT  patient_id, patient_name, patient_room_id 
		FROM patient AS a JOIN treats_physician_patient AS b ON a.patient_id = b.treats_patient_id
		WHERE b.treats_physician_id = 104)
	AS D ON C.note_patient_id = D.patient_id 
    GROUP BY patient_id) AS P ON (sbar_note.note_patient_id = P.patient_id AND sbar_note.date_created = P.tdate);

 /*SELECT k.date_created, note_id,note_room_id FROM sbar_note JOIN (
 SELECT max(date_created) AS date_created, note_patient_id
	FROM manage_nurse_note AS a JOIN sbar_note AS b ON a.manage_note_id = b.note_id 
	WHERE manage_by_nurse_id = 1 GROUP BY note_patient_id) AS k ON sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id
    WHERE sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id;*/
    
    
    
/*get latest info for nurse's patient */

/* p.patient_name, sbar_note.a_problem, sbar_note.note_room_id, sbar_note.r_priority */
SELECT * FROM sbar_note JOIN(
	 SELECT k.date_created, note_id,note_room_id FROM sbar_note JOIN (
		SELECT max(date_created) AS date_created, note_patient_id
		FROM manage_nurse_note AS a JOIN sbar_note AS b ON a.manage_note_id = b.note_id 
		WHERE manage_by_nurse_id = 1 GROUP BY note_patient_id) AS k ON sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id
    WHERE sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id) AS c JOIN patient AS p 
    ON sbar_note.date_created = C.date_created AND sbar_note.note_id = C.note_id AND p.patient_id = sbar_note.note_patient_id
 WHERE sbar_note.date_created = C.date_created AND sbar_note.note_id = C.note_id; 
 
 /*testing*/
 SELECT   p.patient_name, sbar_note.a_problem, sbar_note.note_room_id, sbar_note.r_priority,
 CASE 
 WHEN 5 <= (timestampDIFF(HOUR,sbar_note.date_created, CURRENT_TIMESTAMP)) THEN 'Needs update'
 WHEN 5 > (timestampDIFF(HOUR,sbar_note.date_created, CURRENT_TIMESTAMP)) THEN 'up to date'
 END AS update_status  
 FROM sbar_note JOIN(
	 SELECT k.date_created, note_id,note_room_id FROM sbar_note JOIN (
		SELECT max(date_created) AS date_created, note_patient_id
		FROM manage_nurse_note AS a JOIN sbar_note AS b ON a.manage_note_id = b.note_id 
		WHERE manage_by_nurse_id = 1 GROUP BY note_patient_id) AS k ON sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id
    WHERE sbar_note.date_created = k.date_created AND sbar_note.note_patient_id = k.note_patient_id) AS c JOIN patient AS p 
    ON sbar_note.date_created = C.date_created AND sbar_note.note_id = C.note_id AND p.patient_id = sbar_note.note_patient_id
 WHERE sbar_note.date_created = C.date_created AND sbar_note.note_id = C.note_id; 




