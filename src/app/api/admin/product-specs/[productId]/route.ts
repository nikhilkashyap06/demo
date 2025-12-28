import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const pool = getDbPool();
    const { productId } = await params;
    const [rows] = await pool.query('SELECT * FROM product_specifications WHERE product_id = ? LIMIT 1', [productId]);
    if ((rows as any[]).length === 0) {
      return NextResponse.json({ success: false, message: 'Specification not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: (rows as any[])[0] });
  } catch (error) {
    console.error('Failed to get product specification:', error);
    return NextResponse.json({ success: false, message: 'Failed to get product specification' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const pool = getDbPool();
    const { productId } = await params;
    const body = await request.json();
    const { title, description, image_url, is_active } = body;

    if (!title) {
      return NextResponse.json({ success: false, message: 'title is required' }, { status: 400 });
    }

    const [exists] = await pool.query('SELECT id FROM product_specifications WHERE product_id = ?', [productId]);
    if ((exists as any[]).length === 0) {
      await pool.query('INSERT INTO product_specifications (product_id, title, description, image_url, is_active) VALUES (?, ?, ?, ?, ?)', [productId, title, description || null, image_url || null, is_active ? 1 : 0]);
    } else {
      await pool.query('UPDATE product_specifications SET title = ?, description = ?, image_url = ?, is_active = ? WHERE product_id = ?', [title, description || null, image_url || null, is_active ? 1 : 0, productId]);
    }

    return NextResponse.json({ success: true, message: 'Specification updated' });
  } catch (error) {
    console.error('Failed to update product specification:', error);
    return NextResponse.json({ success: false, message: 'Failed to update product specification' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const pool = getDbPool();
    const { productId } = await params;
    await pool.query('DELETE FROM product_specifications WHERE product_id = ?', [productId]);
    return NextResponse.json({ success: true, message: 'Specification deleted' });
  } catch (error) {
    console.error('Failed to delete product specification:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete product specification' }, { status: 500 });
  }
}
