import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT ps.*, p.name AS product_name FROM product_specifications ps JOIN products p ON ps.product_id = p.id ORDER BY ps.updated_at DESC'
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Failed to fetch product specifications:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch product specifications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const pool = getDbPool();
    const body = await request.json();
    const { product_id, title, description, image_url, is_active } = body;

    if (!product_id || !title) {
      return NextResponse.json({ success: false, message: 'product_id and title are required' }, { status: 400 });
    }

    const [productRows] = await pool.query('SELECT id FROM products WHERE id = ?', [product_id]);
    if ((productRows as any[]).length === 0) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    await pool.query(
      'INSERT INTO product_specifications (product_id, title, description, image_url, is_active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), image_url = VALUES(image_url), is_active = VALUES(is_active)',
      [product_id, title, description || null, image_url || null, is_active ? 1 : 0]
    );

    return NextResponse.json({ success: true, message: 'Specification saved' });
  } catch (error) {
    console.error('Failed to save product specification:', error);
    return NextResponse.json({ success: false, message: 'Failed to save product specification' }, { status: 500 });
  }
}
