-- Insert default organization
INSERT INTO organizations (id, name, subscription_status, max_employees)
VALUES (UUID(), 'Default Organization', 'ACTIVE', 100);

-- Get the organization ID
SET @org_id = (SELECT id FROM organizations ORDER BY created_at DESC LIMIT 1);

-- Insert admin user
INSERT INTO users (
    id,
    organization_id,
    email,
    password_hash,
    role,
    status
)
VALUES (
    UUID(),
    @org_id,
    'admin@example.com',
    '$2b$10$ejReq25VMtJNmaxCwXM4..vGY3uotSVf25mw94x2ctX2RZzgnolha',
    'ADMIN',
    'ACTIVE'
);

-- Get the user ID
SET @user_id = (SELECT id FROM users ORDER BY created_at DESC LIMIT 1);

-- Insert employee profile for admin
INSERT INTO employee_profiles (
    id,
    user_id,
    organization_id,
    first_name,
    last_name,
    date_of_birth,
    gender,
    contact_number,
    position,
    department,
    hire_date,
    employment_status,
    salary_information
)
VALUES (
    UUID(),
    @user_id,
    @org_id,
    'John',
    'Smith',
    '1990-01-15',
    'MALE',
    '+36201234567',
    'HR Director',
    'Human Resources',
    '2024-01-01',
    'FULL_TIME',
    JSON_OBJECT(
        'base_salary', 850000,
        'currency', 'HUF',
        'payment_interval', 'MONTHLY'
    )
); 