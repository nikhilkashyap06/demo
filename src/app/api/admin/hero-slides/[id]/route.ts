import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../../lib/db';

// Delete a hero slide
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const pool = getDbPool();
    const { id: slideId } = await params;
    
    // Check if slide exists
    const [existingRows] = await pool.query('SELECT id FROM hero_slides WHERE id = ?', [slideId]);
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Hero slide not found' },
        { status: 404 }
      );
    }
    
    // Delete the slide
    await pool.query('DELETE FROM hero_slides WHERE id = ?', [slideId]);
    
    return NextResponse.json({
      success: true,
      message: 'Hero slide deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete hero slide:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete hero slide' },
      { status: 500 }
    );
  }
}

// Update a hero slide
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const pool = getDbPool();
    const { id: slideId } = await params;
    const body = await request.json();
    
    console.log("Received update request for hero slide:", { slideId, body });
    
    const { title, description, cta_label, cta_href, image_url, category, position, is_active } = body; // Add category
    
    // Validate required fields
    if (!title || !description || !image_url) {
      return NextResponse.json(
        { success: false, message: 'Title, description, and image URL are required' },
        { status: 400 }
      );
    }
    
    // Check if slide exists
    const [existingRows] = await pool.query('SELECT id FROM hero_slides WHERE id = ?', [slideId]);
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Hero slide not found' },
        { status: 404 }
      );
    }
    
    console.log("Updating hero slide with data:", {
      title, description, cta_label, cta_href, image_url, category, position, is_active, slideId
    });
    
    // Update the slide
    await pool.query(
      'UPDATE hero_slides SET title = ?, description = ?, cta_label = ?, cta_href = ?, image_url = ?, category = ?, position = ?, is_active = ? WHERE id = ?', // Add category
      [title, description, cta_label || null, cta_href || null, image_url, category || null, position || 1, is_active ? 1 : 0, slideId] // Add category
    );
    
    return NextResponse.json({
      success: true,
      message: 'Hero slide updated successfully',
      data: { id: slideId, ...body }
    });
  } catch (error) {
    console.error('Failed to update hero slide:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update hero slide' },
      { status: 500 }
    );
  }
}