import { NextResponse, type NextRequest } from 'next/server';
import { getDbPool } from '../../../../../lib/db';

// Delete a product
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const pool = getDbPool();
    const { id: productId } = await params;
    
    // Check if product exists
    const [existingRows] = await pool.query('SELECT id FROM products WHERE id = ?', [productId]);
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Delete the product
    await pool.query('DELETE FROM products WHERE id = ?', [productId]);
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

// Update a product
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const pool = getDbPool();
    const { id: productId } = await params;
    const body = await request.json();
    
    const { name, slug, description, image_url, category, is_featured, is_active } = body;
    
    // Validate required fields
    if (!name || !slug || !description) {
      return NextResponse.json(
        { success: false, message: 'Name, slug, and description are required' },
        { status: 400 }
      );
    }
    
    // Check if product exists
    const [existingRows] = await pool.query('SELECT id FROM products WHERE id = ?', [productId]);
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Update the product
    await pool.query(
      'UPDATE products SET name = ?, slug = ?, description = ?, image_url = ?, category = ?, is_featured = ?, is_active = ? WHERE id = ?',
      [name, slug, description, image_url || null, category || null, is_featured ? 1 : 0, is_active ? 1 : 0, productId]
    );
    
    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      data: { id: productId, ...body }
    });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update product' },
      { status: 500 }
    );
  }
}