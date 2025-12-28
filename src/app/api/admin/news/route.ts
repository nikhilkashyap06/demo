import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../lib/db';

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

export async function GET() {
  try {
    const pool = getDbPool();
    await ensureNewsSchema();
    let rows: any;
    try {
      const [r] = await pool.query('SELECT * FROM news ORDER BY publish_date DESC, created_at DESC');
      rows = r;
    } catch (err) {
      const [r] = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
      rows = r;
    }
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Failed to fetch news:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: 'Failed to fetch news', error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const pool = getDbPool();
    await ensureNewsSchema();
    const body = await request.json();

    const { title, summary, content, image_url, publish_date, is_published } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Title is required' },
        { status: 400 }
      );
    }

    let slug = slugify(title);
    // Ensure unique slug
    const [existing] = await pool.query('SELECT id FROM news WHERE slug = ?', [slug]);
    if ((existing as any[]).length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    const pubDate = publish_date ? new Date(publish_date) : new Date();

    let result: any;
    try {
      const [r] = await pool.query(
        'INSERT INTO news (title, slug, summary, content, image_url, publish_date, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          title,
          slug,
          summary || null,
          content || null,
          image_url || null,
          pubDate.toISOString().slice(0, 10),
          is_published ? 1 : 0,
        ]
      );
      result = r;
    } catch (err) {
      const [r] = await pool.query(
        'INSERT INTO news (title, slug, summary, content, image_url) VALUES (?, ?, ?, ?, ?)',
        [
          title,
          slug,
          summary || null,
          content || null,
          image_url || null,
        ]
      );
      result = r;
    }

    return NextResponse.json({
      success: true,
      message: 'News created successfully',
      data: { id: (result as any).insertId, ...body, slug }
    });
  } catch (error) {
    console.error('Failed to create news:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: 'Failed to create news', error: message }, { status: 500 });
  }
}
