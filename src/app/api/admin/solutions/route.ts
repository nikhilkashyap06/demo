import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../lib/db';

// Get all solutions
export async function GET() {
  try {
    const pool = getDbPool();
    const [rows] = await pool.query('SELECT * FROM solutions ORDER BY created_at DESC');
    
    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Failed to fetch solutions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch solutions' },
      { status: 500 }
    );
  }
}

// Create a new solution
export async function POST(request: NextRequest) {
  try {
    const pool = getDbPool();
    const body = await request.json();
    
    const { title, slug, summary, description, image_url, category, is_active } = body; // Add category
    
    // Validate required fields
    if (!title || !slug || !summary || !description) {
      return NextResponse.json(
        { success: false, message: 'Title, slug, summary, and description are required' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      'INSERT INTO solutions (title, slug, summary, description, image_url, category, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)', // Add category
      [title, slug, summary, description, image_url || null, category || null, is_active ? 1 : 0] // Add category
    );
    
    return NextResponse.json({
      success: true,
      message: 'Solution created successfully',
      data: { id: (result as any).insertId, ...body }
    });
  } catch (error) {
    console.error('Failed to create solution:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create solution' },
      { status: 500 }
    );
  }
}