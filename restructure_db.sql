-- First, add the new columns to users table
ALTER TABLE users
ADD COLUMN first_name varchar(255) NOT NULL AFTER email,
ADD COLUMN last_name varchar(255) NOT NULL AFTER first_name,
ADD COLUMN date_of_birth date DEFAULT NULL AFTER last_name,
ADD COLUMN gender enum('MALE','FEMALE','OTHER') DEFAULT NULL AFTER date_of_birth,
ADD COLUMN contact_number varchar(20) DEFAULT NULL AFTER gender,
ADD COLUMN emergency_contact varchar(20) DEFAULT NULL AFTER contact_number,
ADD COLUMN address text DEFAULT NULL AFTER emergency_contact,
ADD COLUMN department varchar(255) DEFAULT NULL AFTER address,
ADD COLUMN position varchar(255) DEFAULT NULL AFTER department,
ADD COLUMN hire_date date DEFAULT NULL AFTER position,
ADD COLUMN employment_status enum('FULL_TIME','PART_TIME','CONTRACT','INTERN') DEFAULT 'FULL_TIME' AFTER hire_date,
ADD COLUMN salary_information JSON DEFAULT NULL AFTER employment_status;

-- Drop the employee_profiles table since we don't need it anymore
DROP TABLE IF EXISTS employee_profiles;

-- Now let's update our admin user with the employee data
UPDATE users 
SET 
    first_name = 'John',
    last_name = 'Smith',
    date_of_birth = '1990-01-15',
    gender = 'MALE',
    contact_number = '+36201234567',
    position = 'HR Director',
    department = 'Human Resources',
    hire_date = '2024-01-01',
    employment_status = 'FULL_TIME',
    salary_information = JSON_OBJECT(
        'base_salary', 850000,
        'currency', 'HUF',
        'payment_interval', 'MONTHLY'
    )
WHERE email = 'admin@example.com'; 