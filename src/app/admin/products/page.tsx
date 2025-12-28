"use client";

import { useState, useEffect } from "react";
import ProductForm from "./product-form";
import ProductList from "./product-list";
import SpecForm from "./spec-form";
import ApplicationForm from "./application-form";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSpecForm, setShowSpecForm] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Product deleted successfully');
        fetchProducts(); // Refresh the list
      } else {
        alert('Failed to delete product: ' + data.message);
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setShowSpecForm(false);
    setShowApplicationForm(false);
    setEditingProduct(null);
    fetchProducts(); // Refresh the list
  };

  return (
    <div className="py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your product catalog
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
              setShowSpecForm(false);
              setShowApplicationForm(false);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Product
          </button>
          <button
            onClick={() => {
              setShowForm(false);
              setShowSpecForm(true);
              setShowApplicationForm(false);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Specification
          </button>
          <button
            onClick={() => {
              setShowForm(false);
              setShowSpecForm(false);
              setShowApplicationForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Application
          </button>
        </div>
      </div>

      {showForm ? (
        <ProductForm
          product={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      ) : showSpecForm ? (
        <SpecForm
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowSpecForm(false);
          }}
        />
      ) : showApplicationForm ? (
        <ApplicationForm
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowApplicationForm(false);
          }}
        />
      ) : (
        <ProductList
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
