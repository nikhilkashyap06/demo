import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../../lib/db';

async function ensureNewsSchema() {
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      summary TEXT,
      content LONGTEXT,
      image_url VARCHAR(512),
      publish_date DATE,
      is_published BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  const [columns] = await pool.query('DESCRIBE news');
  const colNames = (columns as any[]).map((c: any) => c.Field);
  if (!colNames.includes('summary')) {
    await pool.query('ALTER TABLE news ADD COLUMN summary TEXT NULL AFTER slug');
  }
  if (!colNames.includes('content')) {
    await pool.query('ALTER TABLE news ADD COLUMN content LONGTEXT NULL AFTER summary');
  }
  if (!colNames.includes('image_url')) {
    await pool.query('ALTER TABLE news ADD COLUMN image_url VARCHAR(512) NULL AFTER content');
  }
  if (!colNames.includes('publish_date')) {
    await pool.query('ALTER TABLE news ADD COLUMN publish_date DATE NULL AFTER image_url');
  }
  if (!colNames.includes('is_published')) {
    await pool.query('ALTER TABLE news ADD COLUMN is_published BOOLEAN DEFAULT false AFTER publish_date');
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const pool = getDbPool();
    await ensureNewsSchema();
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
    }
    const body = await request.json();

    const { title, summary, content, image_url, publish_date, is_published } = body;

    // Verify exists
    const [existing] = await pool.query('SELECT id FROM news WHERE id = ?', [numericId]);
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ success: false, message: 'News not found' }, { status: 404 });
    }

    await pool.query(
      'UPDATE news SET title = ?, summary = ?, content = ?, image_url = ?, publish_date = ?, is_published = ? WHERE id = ?',
      [
        title,
        summary || null,
        content || null,
        image_url || null,
        (publish_date ? new Date(publish_date) : new Date()).toISOString().slice(0, 10),
        is_published ? 1 : 0,
        numericId,
      ]
    );

    return NextResponse.json({ success: true, message: 'News updated successfully', data: { id: numericId, ...body } });
  } catch (error) {
    console.error('Failed to update news:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: 'Failed to update news', error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const pool = getDbPool();
    await ensureNewsSchema();
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
    }

    const [existing] = await pool.query('SELECT id FROM news WHERE id = ?', [numericId]);
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ success: false, message: 'News not found' }, { status: 404 });
    }

    await pool.query('DELETE FROM news WHERE id = ?', [numericId]);
    return NextResponse.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    console.error('Failed to delete news:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: 'Failed to delete news', error: message }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const pool = getDbPool();
    await ensureNewsSchema();
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
    }

    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [numericId]);
    const items = rows as any[];
    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, message: 'News not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: items[0] });
  } catch (error) {
    console.error('Failed to fetch news item:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: 'Failed to fetch news item', error: message }, { status: 500 });
  }
}
