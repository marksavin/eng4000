SELECT * FROM capstonedb.patient;

SET FOREIGN_KEY_CHECKS=0;
-- SHOW VARIABLES LIKE "local_infile";  
-- SHOW VARIABLES LIKE "secure_file_priv"; 
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/patient.csv'
INTO TABLE capstonedb.patient 
FIELDS TERMINATED BY ',' 
ignore 1 lines;

SELECT * FROM capstonedb.patient;