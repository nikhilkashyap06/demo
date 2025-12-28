import { NextResponse } from 'next/server';
import { getDbPool } from '../../../../lib/db';

export async function GET() {
  try {
    const pool = getDbPool();
    
    // Get products count
    const [productsResult] = await pool.query('SELECT COUNT(*) as count FROM products');
    const productsCount = (productsResult as any)[0].count;
    
    // Get solutions count
    const [solutionsResult] = await pool.query('SELECT COUNT(*) as count FROM solutions');
    const solutionsCount = (solutionsResult as any)[0].count;
    
    // Get lab equipment count
    const [labEquipmentResult] = await pool.query('SELECT COUNT(*) as count FROM lab_equipment');
    const labEquipmentCount = (labEquipmentResult as any)[0].count;
    
    // Get hero slides count
    const [heroSlidesResult] = await pool.query('SELECT COUNT(*) as count FROM hero_slides');
    const heroSlidesCount = (heroSlidesResult as any)[0].count;
    
    // Get news count
    const [newsResult] = await pool.query('SELECT COUNT(*) as count FROM news');
    const newsCount = (newsResult as any)[0].count;
    
    // Get contact requests count
    const [contactRequestsResult] = await pool.query('SELECT COUNT(*) as count FROM contact_requests');
    const contactRequestsCount = (contactRequestsResult as any)[0].count;
    
    return NextResponse.json({
      success: true,
      data: {
        products: productsCount,
        solutions: solutionsCount,
        labEquipment: labEquipmentCount,
        heroSlides: heroSlidesCount,
        news: newsCount,
        contactRequests: contactRequestsCount
      }
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}