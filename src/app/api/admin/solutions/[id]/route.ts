import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../../lib/db';

// Delete a solution
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const pool = getDbPool();
    const { id: solutionId } = await params;
    
    // Check if solution exists
    const [existingRows] = await pool.query('SELECT id FROM solutions WHERE id = ?', [solutionId]);
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Solution not found' },
        { status: 404 }
      );
    }
    
    // Delete the solution
    await pool.query('DELETE FROM solutions WHERE id = ?', [solutionId]);
    
    return NextResponse.json({
      success: true,
      message: 'Solution deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete solution:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete solution' },
      { status: 500 }
    );
  }
}

// Update a solution
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const pool = getDbPool();
    const { id: solutionId } = await params;
    const body = await request.json();
    
    const { title, slug, summary, description, image_url, category, is_active } = body; // Add category
    
    // Validate required fields
    if (!title || !slug || !summary || !description) {
      return NextResponse.json(
        { success: false, message: 'Title, slug, summary, and description are required' },
        { status: 400 }
      );
    }
    
    // Check if solution exists
    const [existingRows] = await pool.query('SELECT id FROM solutions WHERE id = ?', [solutionId]);
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Solution not found' },
        { status: 404 }
      );
    }
    
    // Update the solution
    await pool.query(
      'UPDATE solutions SET title = ?, slug = ?, summary = ?, description = ?, image_url = ?, category = ?, is_active = ? WHERE id = ?', // Add category
      [title, slug, summary, description, image_url || null, category || null, is_active ? 1 : 0, solutionId] // Add category
    );
    
    return NextResponse.json({
      success: true,
      message: 'Solution updated successfully',
      data: { id: solutionId, ...body }
    });
  } catch (error) {
    console.error('Failed to update solution:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update solution' },
      { status: 500 }
    );
  }
}