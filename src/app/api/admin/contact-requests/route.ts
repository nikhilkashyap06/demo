import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';
import { ensureContactTable } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Ensure the contact table exists
    await ensureContactTable();
    
    const pool = getDbPool();
    
    // Get all contact requests ordered by created date (newest first)
    const [rows] = await pool.query(
      'SELECT id, name, email, company, message, created_at FROM contact_requests ORDER BY created_at DESC'
    );
    
    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Failed to fetch contact requests:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact requests' },
      { status: 500 }
    );
  }
}