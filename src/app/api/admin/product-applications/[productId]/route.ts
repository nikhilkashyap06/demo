import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '@/lib/db';

async function ensureProductApplicationsSchema() {
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS product_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      icon_url VARCHAR(512),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_product_app (product_id),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  const [columns] = await pool.query('DESCRIBE product_applications');
  const colNames = (columns as any[]).map((c: any) => c.Field);
  if (!colNames.includes('icon_url')) {
    await pool.query('ALTER TABLE product_applications ADD COLUMN icon_url VARCHAR(512) NULL AFTER description');
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const pool = getDbPool();
    await ensureProductApplicationsSchema();
    const { productId } = await params;
    const [rows] = await pool.query('SELECT * FROM product_applications WHERE product_id = ? LIMIT 1', [productId]);
    if ((rows as any[]).length === 0) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: (rows as any[])[0] });
  } catch (error) {
    console.error('Failed to get product application:', error);
    return NextResponse.json({ success: false, message: 'Failed to get product application' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const pool = getDbPool();
    await ensureProductApplicationsSchema();
    const { productId } = await params;
    const body = await request.json();
    const { title, description, icon_url, is_active } = body;

    if (!title) {
      return NextResponse.json({ success: false, message: 'title is required' }, { status: 400 });
    }

    const [exists] = await pool.query('SELECT id FROM product_applications WHERE product_id = ?', [productId]);
    if ((exists as any[]).length === 0) {
      await pool.query('INSERT INTO product_applications (product_id, title, description, icon_url, is_active) VALUES (?, ?, ?, ?, ?)', [productId, title, description || null, icon_url || null, is_active ? 1 : 0]);
    } else {
      await pool.query('UPDATE product_applications SET title = ?, description = ?, icon_url = ?, is_active = ? WHERE product_id = ?', [title, description || null, icon_url || null, is_active ? 1 : 0, productId]);
    }

    return NextResponse.json({ success: true, message: 'Application updated' });
  } catch (error) {
    console.error('Failed to update product application:', error);
    return NextResponse.json({ success: false, message: 'Failed to update product application' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const pool = getDbPool();
    const { productId } = await params;
    await pool.query('DELETE FROM product_applications WHERE product_id = ?', [productId]);
    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    console.error('Failed to delete product application:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete product application' }, { status: 500 });
  }
}
