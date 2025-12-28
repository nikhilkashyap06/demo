import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../../lib/db';

// Delete lab equipment
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const pool = getDbPool();
    const { id: equipmentId } = await params;
    
    // Check if equipment exists
    const [existingRows] = await pool.query('SELECT id FROM lab_equipment WHERE id = ?', [equipmentId]);
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Lab equipment not found' },
        { status: 404 }
      );
    }
    
    // Delete the equipment
    await pool.query('DELETE FROM lab_equipment WHERE id = ?', [equipmentId]);
    
    return NextResponse.json({
      success: true,
      message: 'Lab equipment deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete lab equipment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete lab equipment' },
      { status: 500 }
    );
  }
}

// Update lab equipment
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const pool = getDbPool();
    const { id: equipmentId } = await params;
    const body = await request.json();
    
    const { name, slug, description, image_url, category, is_active } = body;
    
    // Validate required fields
    if (!name || !slug || !description) {
      return NextResponse.json(
        { success: false, message: 'Name, slug, and description are required' },
        { status: 400 }
      );
    }
    
    // Check if equipment exists
    const [existingRows] = await pool.query('SELECT id FROM lab_equipment WHERE id = ?', [equipmentId]);
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Lab equipment not found' },
        { status: 404 }
      );
    }
    
    // Update the equipment
    await pool.query(
      'UPDATE lab_equipment SET name = ?, slug = ?, description = ?, image_url = ?, category = ?, is_active = ? WHERE id = ?',
      [name, slug, description, image_url || null, category || null, is_active ? 1 : 0, equipmentId]
    );
    
    return NextResponse.json({
      success: true,
      message: 'Lab equipment updated successfully',
      data: { id: equipmentId, ...body }
    });
  } catch (error) {
    console.error('Failed to update lab equipment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update lab equipment' },
      { status: 500 }
    );
  }
}