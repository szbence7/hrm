import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return new NextResponse(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'hrm_db'
    });

    const [rows]: any = await connection.execute(
      `SELECT 
        first_name, last_name, email, date_of_birth, gender,
        contact_number, emergency_contact, address, department,
        position, hire_date, employment_status, salary_information
      FROM users 
      WHERE email = ?`,
      [session.user.email]
    );

    await connection.end();

    if (rows.length === 0) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const user = rows[0];
    
    // Parse the JSON string if it exists
    if (user.salary_information) {
      user.salary_information = JSON.parse(user.salary_information);
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
} 