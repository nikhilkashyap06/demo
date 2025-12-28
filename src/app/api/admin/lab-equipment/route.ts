import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../lib/db';

// Get all lab equipment
export async function GET() {
  try {
    const pool = getDbPool();
    const [rows] = await pool.query('SELECT * FROM lab_equipment ORDER BY created_at DESC');
    
    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Failed to fetch lab equipment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch lab equipment' },
      { status: 500 }
    );
  }
}

// Create new lab equipment
export async function POST(request: NextRequest) {
  try {
    const pool = getDbPool();
    const body = await request.json();
    
    const { name, slug, description, image_url, category, is_active } = body;
    
    // Validate required fields
    if (!name || !slug || !description) {
      return NextResponse.json(
        { success: false, message: 'Name, slug, and description are required' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      'INSERT INTO lab_equipment (name, slug, description, image_url, category, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [name, slug, description, image_url || null, category || null, is_active ? 1 : 0]
    );
    
    return NextResponse.json({
      success: true,
      message: 'Lab equipment created successfully',
      data: { id: (result as any).insertId, ...body }
    });
  } catch (error) {
    console.error('Failed to create lab equipment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create lab equipment' },
      { status: 500 }
    );
  }
}