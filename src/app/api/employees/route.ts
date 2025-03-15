import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hrm_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      department,
      position,
      dateOfBirth,
      gender,
      contactNumber,
      emergencyContact,
      address
    } = body;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    try {
      // Start transaction
      await connection.beginTransaction();

      // Generate UUID for user and organization
      const userId = await connection.query('SELECT UUID() as id');
      const organizationId = await connection.query('SELECT id FROM organizations LIMIT 1');
      const id = (userId[0] as any)[0].id;
      const orgId = (organizationId[0] as any)[0]?.id;

      if (!orgId) {
        throw new Error('No organization found');
      }

      // Insert user
      await connection.query(
        `INSERT INTO users (id, organization_id, email, password_hash, role, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, orgId, email, password, role, 'ACTIVE']
      );

      // Insert employee profile
      await connection.query(
        `INSERT INTO employee_profiles (id, user_id, organization_id, first_name, last_name,
          date_of_birth, gender, contact_number, emergency_contact, address, department,
          position, hire_date, employment_status)
         VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), 'FULL_TIME')`,
        [id, orgId, firstName, lastName, dateOfBirth || null, gender || null,
         contactNumber || null, emergencyContact || null, address || null,
         department, position]
      );

      // Commit transaction
      await connection.commit();

      return NextResponse.json({ 
        id,
        message: 'Employee added successfully' 
      }, { status: 201 });

    } catch (error) {
      // Rollback transaction on error
      await connection.rollback();
      throw error;
    } finally {
      // Release connection back to the pool
      connection.release();
    }

  } catch (error) {
    console.error('Error adding employee:', error);
    return NextResponse.json(
      { error: 'Failed to add employee' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.query(
        `SELECT 
          u.id,
          u.email,
          u.role,
          u.status,
          ep.first_name,
          ep.last_name,
          ep.department,
          ep.position
         FROM users u
         JOIN employee_profiles ep ON u.id = ep.user_id
         WHERE u.status = 'ACTIVE'
         ORDER BY ep.first_name, ep.last_name`
      );

      return NextResponse.json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
} 