ALTER TABLE employee_profiles
ADD COLUMN date_of_birth date DEFAULT NULL AFTER last_name,
ADD COLUMN gender enum('MALE','FEMALE','OTHER') DEFAULT NULL AFTER date_of_birth,
ADD COLUMN contact_number varchar(20) DEFAULT NULL AFTER gender,
ADD COLUMN department varchar(255) DEFAULT NULL AFTER contact_number,
ADD COLUMN hire_date date DEFAULT NULL AFTER position,
ADD COLUMN salary_information JSON DEFAULT NULL; 