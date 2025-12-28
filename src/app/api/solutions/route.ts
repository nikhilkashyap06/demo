import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = getDbPool();
    const [solutions] = await pool.query('SELECT * FROM solutions WHERE is_active = TRUE ORDER BY created_at DESC');
    
    // Create response with cache control headers to prevent caching
    const response = NextResponse.json({
      success: true,
      solutions: solutions
    });
    
    // Add cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Failed to fetch solutions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch solutions' },
      { status: 500 }
    );
  }
}