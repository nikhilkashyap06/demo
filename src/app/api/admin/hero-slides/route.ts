import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../lib/db';

// Get all hero slides
export async function GET() {
  try {
    const pool = getDbPool();
    const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY position ASC');
    
    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Failed to fetch hero slides:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch hero slides' },
      { status: 500 }
    );
  }
}

// Create a new hero slide
export async function POST(request: NextRequest) {
  try {
    const pool = getDbPool();
    const body = await request.json();
    
    const { title, description, cta_label, cta_href, image_url, category, position, is_active } = body; // Add category
    
    // Validate required fields
    if (!title || !description || !image_url) {
      return NextResponse.json(
        { success: false, message: 'Title, description, and image URL are required' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      'INSERT INTO hero_slides (title, description, cta_label, cta_href, image_url, category, position, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', // Add category
      [title, description, cta_label || null, cta_href || null, image_url, category || null, position || 1, is_active ? 1 : 0] // Add category
    );
    
    return NextResponse.json({
      success: true,
      message: 'Hero slide created successfully',
      data: { id: (result as any).insertId, ...body }
    });
  } catch (error) {
    console.error('Failed to create hero slide:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create hero slide' },
      { status: 500 }
    );
  }
}
