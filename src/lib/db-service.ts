import 'server-only';
import { getDbPool } from "./db";

interface Page {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface NavigationItem {
  id: number;
  label: string;
  href: string;
  parent_id: number | null;
  position: number;
  is_active: boolean;
  children?: NavigationItem[];
}

interface ContentBlock {
  id: number;
  page_id: number;
  block_type: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  button_text: string | null;
  button_url: string | null;
  position: number;
  is_active: boolean;
}

export const dbService = {
  // Initialize the database
  async initialize() {
    const pool = getDbPool();
    try {
      // Import the initializeDatabase function directly to avoid circular dependency
      const { initializeDatabase } = await import('./db');
      await initializeDatabase();
      return { success: true };
    } catch (error) {
      console.error('Database initialization failed:', error);
      return { success: false, error };
    }
  },

  // Page operations
  async getPageBySlug(slug: string): Promise<Page | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM pages WHERE slug = ? AND is_active = TRUE', 
      [slug]
    ) as unknown as [Page[]];
    return rows && rows.length > 0 ? rows[0] : null;
  },

  async getPageBlocks(pageId: number): Promise<ContentBlock[]> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM content_blocks WHERE page_id = ? AND is_active = TRUE ORDER BY position ASC',
      [pageId]
    ) as unknown as [ContentBlock[]];
    return rows || [];
  },

  // Navigation
  async getNavigation(): Promise<NavigationItem[]> {
    const pool = getDbPool();
    const [items] = await pool.query(
      'SELECT * FROM navigation WHERE is_active = TRUE ORDER BY position ASC'
    ) as unknown as [NavigationItem[]];

    // Build hierarchical navigation
    const navMap = new Map<number, NavigationItem>();
    const rootItems: NavigationItem[] = [];

    // First pass: create map of all items
    items.forEach(item => {
      navMap.set(item.id, { ...item, children: [] });
    });

    // Second pass: build hierarchy
    items.forEach(item => {
      const navItem = navMap.get(item.id);
      if (navItem) {
        if (item.parent_id) {
          const parent = navMap.get(item.parent_id);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(navItem);
          }
        } else {
          rootItems.push(navItem);
        }
      }
    });

    return rootItems;
  },

  // Products
  async getProducts(category?: string, limit = 10): Promise<Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    is_featured: boolean;
    created_at?: string;
    updated_at?: string;
  }>> {
    const pool = getDbPool();
    let query = 'SELECT * FROM products WHERE is_active = TRUE';
    const params: (string | number)[] = [];

    if (category) {
      if (category === 'flipkart-amazon') {
        query += ' AND category IN (?, ?, ?)';
        params.push('flipkart', 'amazon', 'flipkart-amazon');
      } else {
        query += ' AND category = ?';
        params.push(category);
      }
    }

    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(limit);

    const [rows] = await pool.query(query, params) as unknown as [Array<{
      id: number;
      name: string;
      slug: string;
      description: string;
      price: number;
      image_url: string;
      category: string;
      is_featured: boolean;
    }>];
    return rows || [];
  },

  // Get single product by slug
  async getProductBySlug(slug: string): Promise<{
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    is_featured: boolean;
    brochure_url?: string;
  } | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE slug = ? AND is_active = TRUE LIMIT 1',
      [slug]
    ) as unknown as [Array<{
      id: number;
      name: string;
      slug: string;
      description: string;
      price: number;
      image_url: string;
      category: string;
      is_featured: boolean;
      brochure_url?: string;
    }>];
    return rows && rows.length > 0 ? rows[0] : null;
  },

  async getProductSpecification(productId: number): Promise<{
    id: number;
    product_id: number;
    title: string;
    description: string | null;
    image_url: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  } | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM product_specifications WHERE product_id = ? AND is_active = TRUE LIMIT 1',
      [productId]
    ) as unknown as [Array<{
      id: number;
      product_id: number;
      title: string;
      description: string | null;
      image_url: string | null;
      is_active: boolean;
      created_at: Date;
      updated_at: Date;
    }>];
    return rows && rows.length > 0 ? rows[0] : null;
  },

  async upsertProductSpecification(data: {
    product_id: number;
    title: string;
    description?: string | null;
    image_url?: string | null;
    is_active?: boolean;
  }) {
    const pool = getDbPool();
    await pool.query(
      'INSERT INTO product_specifications (product_id, title, description, image_url, is_active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), image_url = VALUES(image_url), is_active = VALUES(is_active)',
      [
        data.product_id,
        data.title,
        data.description ?? null,
        data.image_url ?? null,
        data.is_active === undefined ? 1 : data.is_active ? 1 : 0,
      ]
    );
    return { success: true };
  },

  async deleteProductSpecification(productId: number) {
    const pool = getDbPool();
    await pool.query('DELETE FROM product_specifications WHERE product_id = ?', [productId]);
    return { success: true };
  },

  async getProductApplication(productId: number): Promise<{
    id: number;
    product_id: number;
    title: string;
    description: string | null;
    icon_url: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  } | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM product_applications WHERE product_id = ? AND is_active = TRUE LIMIT 1',
      [productId]
    ) as unknown as [Array<{
      id: number;
      product_id: number;
      title: string;
      description: string | null;
      icon_url: string | null;
      is_active: boolean;
      created_at: Date;
      updated_at: Date;
    }>];
    return rows && rows.length > 0 ? rows[0] : null;
  },

  async upsertProductApplication(data: {
    product_id: number;
    title: string;
    description?: string | null;
    icon_url?: string | null;
    is_active?: boolean;
  }) {
    const pool = getDbPool();
    await pool.query(
      'INSERT INTO product_applications (product_id, title, description, icon_url, is_active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), icon_url = VALUES(icon_url), is_active = VALUES(is_active)',
      [
        data.product_id,
        data.title,
        data.description ?? null,
        data.icon_url ?? null,
        data.is_active === undefined ? 1 : data.is_active ? 1 : 0,
      ]
    );
    return { success: true };
  },

  async deleteProductApplication(productId: number) {
    const pool = getDbPool();
    await pool.query('DELETE FROM product_applications WHERE product_id = ?', [productId]);
    return { success: true };
  },

  // Lab Equipment
  async getLabEquipment(): Promise<Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
  }>> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT id, name, slug, description, image_url FROM lab_equipment WHERE is_active = TRUE'
    ) as unknown as [Array<{
      id: number;
      name: string;
      slug: string;
      description: string;
      image_url: string;
    }>];
    return rows || [];
  },

  async getLabEquipmentBySlug(slug: string): Promise<{
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
  } | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT id, name, slug, description, image_url FROM lab_equipment WHERE slug = ? AND is_active = TRUE LIMIT 1',
      [slug]
    ) as unknown as [Array<{
      id: number;
      name: string;
      slug: string;
      description: string;
      image_url: string;
    }>];
    return rows && rows.length > 0 ? rows[0] : null;
  },

  // News
  async getNews(limit = 5): Promise<Array<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    publish_date: string;
    created_at: Date;
  }>> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM news WHERE is_published = TRUE ORDER BY publish_date DESC, created_at DESC LIMIT ?',
      [limit]
    ) as unknown as [Array<{
      id: number;
      title: string;
      slug: string;
      summary: string;
      content: string;
      image_url: string;
      publish_date: string;
      created_at: Date;
    }>];
    return rows || [];
  },

  async getNewsBySlug(slug: string): Promise<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    publish_date: string;
    created_at: Date;
  } | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM news WHERE slug = ? AND is_published = TRUE LIMIT 1',
      [slug]
    ) as unknown as [Array<{
      id: number;
      title: string;
      slug: string;
      summary: string;
      content: string;
      image_url: string;
      publish_date: string;
      created_at: Date;
    }>];
    return rows && rows.length > 0 ? rows[0] : null;
  },

  // Solutions
  async getSolutions(): Promise<Array<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string;
    image_url: string;
    category: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }>> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM solutions WHERE is_active = TRUE ORDER BY created_at DESC'
    ) as unknown as [Array<{
      id: number;
      title: string;
      slug: string;
      summary: string;
      description: string;
      image_url: string;
      category: string;
      seo_title: string;
      seo_description: string;
      seo_keywords: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    }>];
    return rows || [];
  },

  // Get a specific solution by slug
  async getSolutionBySlug(slug: string): Promise<{
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string;
    image_url: string;
    category: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  } | null> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM solutions WHERE slug = ? AND is_active = TRUE',
      [slug]
    ) as unknown as [Array<{
      id: number;
      title: string;
      slug: string;
      summary: string;
      description: string;
      image_url: string;
      category: string;
      seo_title: string;
      seo_description: string;
      seo_keywords: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    }>];
  
    return rows && rows.length > 0 ? rows[0] : null;
  },

  // Case Studies
  async getCaseStudies(): Promise<Array<{
    id: number;
    title: string;
    slug: string;
    client_name: string;
    location: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string;
    image_url: string;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
  }>> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM case_studies WHERE is_featured = TRUE ORDER BY created_at DESC'
    ) as unknown as [Array<{
      id: number;
      title: string;
      slug: string;
      client_name: string;
      location: string;
      industry: string;
      challenge: string;
      solution: string;
      results: string;
      image_url: string;
      is_featured: boolean;
      created_at: string;
      updated_at: string;
    }>];
  
    // Transform the data to match what the frontend expects
    const caseStudies = rows.map(caseStudy => ({
      id: caseStudy.id,
      title: caseStudy.title,
      region: caseStudy.location,
      summary: caseStudy.challenge.substring(0, 150) + (caseStudy.challenge.length > 150 ? '...' : ''),
      impact: [
        `Client: ${caseStudy.client_name}`,
        `Industry: ${caseStudy.industry}`,
        caseStudy.results
      ],
      image_url: caseStudy.image_url || '/images/casegreen.jpeg',
      is_active: true,
      created_at: caseStudy.created_at,
      updated_at: caseStudy.updated_at
    }));
  
    return caseStudies as any;
  },

  // Contact form submission
  async submitContactForm(data: {
    name: string;
    email: string;
    company?: string;
    message: string;
  }) {
    const pool = getDbPool();
    const [result] = await pool.query(
      'INSERT INTO contact_requests (name, email, company, message) VALUES (?, ?, ?, ?)',
      [data.name, data.email, data.company || null, data.message]
    );
    return { success: true, id: (result as any).insertId };
  },

  // Newsletter subscription
  async subscribeToNewsletter(email: string, name?: string) {
    const pool = getDbPool();
    try {
      await pool.query(
        'INSERT INTO newsletter_subscriptions (email, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP',
        [email, name || null]
      );
      return { success: true };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return { success: false, error };
    }
  },

  // Get all pages for sitemap
  async getAllPages(): Promise<Array<{ slug: string; updated_at: Date }>> {
    const pool = getDbPool();
    const [rows] = await pool.query('SELECT slug, updated_at FROM pages WHERE is_active = TRUE');
    return rows as Array<{ slug: string; updated_at: Date }>;
  },

  // Get hero slides
  async getHeroSlides(): Promise<Array<{
    id: number;
    title: string;
    description: string;
    cta_label: string;
    cta_href: string;
    image_url: string;
    position: number;
    is_active: boolean;
  }>> {
    const pool = getDbPool();
    const [rows] = await pool.query(
      'SELECT * FROM hero_slides WHERE is_active = TRUE ORDER BY position ASC'
    ) as unknown as [Array<{
      id: number;
      title: string;
      description: string;
      cta_label: string;
      cta_href: string;
      image_url: string;
      position: number;
      is_active: boolean;
    }>];
    
    return rows || [];
  }
};

// Initialize the database when this module is imported
dbService.initialize().catch(console.error);
