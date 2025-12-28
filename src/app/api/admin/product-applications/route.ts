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

export async function GET() {
  try {
    const pool = getDbPool();
    await ensureProductApplicationsSchema();
    const [rows] = await pool.query(
      'SELECT pa.*, p.name AS product_name FROM product_applications pa JOIN products p ON pa.product_id = p.id ORDER BY pa.updated_at DESC'
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Failed to fetch product applications:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch product applications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const pool = getDbPool();
    await ensureProductApplicationsSchema();
    const body = await request.json();
    const { product_id, title, description, icon_url, is_active } = body;

    if (!product_id || !title) {
      return NextResponse.json({ success: false, message: 'product_id and title are required' }, { status: 400 });
    }

    const [productRows] = await pool.query('SELECT id FROM products WHERE id = ?', [product_id]);
    if ((productRows as any[]).length === 0) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    await pool.query(
      'INSERT INTO product_applications (product_id, title, description, icon_url, is_active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), icon_url = VALUES(icon_url), is_active = VALUES(is_active)',
      [product_id, title, description || null, icon_url || null, is_active ? 1 : 0]
    );

    return NextResponse.json({ success: true, message: 'Application saved' });
  } catch (error) {
    console.error('Failed to save product application:', error);
    return NextResponse.json({ success: false, message: 'Failed to save product application' }, { status: 500 });
  }
}
