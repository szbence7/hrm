UPDATE employee_profiles 
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
WHERE user_id = (
    SELECT id 
    FROM users 
    WHERE email = 'admin@example.com'
); 