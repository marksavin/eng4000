SELECT * FROM capstonedb.patient;

SET FOREIGN_KEY_CHECKS=0;
-- SHOW VARIABLES LIKE "local_infile";  
-- SHOW VARIABLES LIKE "secure_file_priv"; 
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/contact_physician_nurse.csv'
INTO TABLE capstonedb.contact_physician_nurse 
FIELDS TERMINATED BY ',' 
ignore 1 lines;

SELECT * FROM capstonedb.contact_physician_nurse;