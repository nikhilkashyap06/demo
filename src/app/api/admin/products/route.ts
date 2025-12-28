import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../lib/db';

// Get all products
export async function GET() {
  try {
    const pool = getDbPool();
    const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    
    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Create a new product
export async function POST(request: NextRequest) {
  try {
    const pool = getDbPool();
    const body = await request.json();
    
    const { name, slug, description, image_url, category, is_featured, is_active } = body;
    
    // Validate required fields
    if (!name || !slug || !description) {
      return NextResponse.json(
        { success: false, message: 'Name, slug, and description are required' },
        { status: 400 }
      );
    }
    
    const normalizedSlug = String(slug).trim().toLowerCase();
    const normalizedName = String(name).trim();
    
    const [existing] = await pool.query('SELECT id FROM products WHERE slug = ?', [normalizedSlug]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json(
        { success: false, message: 'Slug already exists. Please use a unique slug.' },
        { status: 409 }
      );
    }
    
    const [result] = await pool.query(
      'INSERT INTO products (name, slug, description, image_url, category, is_featured, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [normalizedName, normalizedSlug, description, image_url || null, category || null, is_featured ? 1 : 0, is_active ? 1 : 0]
    );
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      data: { id: (result as any).insertId, ...body, slug: normalizedSlug, name: normalizedName }
    });
  } catch (error) {
    const err: any = error;
    if (err && err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, message: 'Duplicate entry. Ensure slug is unique.' },
        { status: 409 }
      );
    }
    const message = err?.message || 'Failed to create product';
    console.error('Failed to create product:', err);
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
