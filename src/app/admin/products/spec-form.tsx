"use client";

import { useEffect, useState } from "react";
import ImageUpload from "../components/image-upload";

export default function SpecForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void; }) {
  const [products, setProducts] = useState<Array<{ id: number; name: string; category?: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState({
    product_id: "",
    title: "",
    description: "",
    image_url: "",
    is_active: true,
  });
  const [hasExisting, setHasExisting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        if (data.success) setProducts(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, []);

  const loadExisting = async (pid: string) => {
    if (!pid) return;
    try {
      const res = await fetch(`/api/admin/product-specs/${pid}`);
      const data = await res.json();
      if (data.success && data.data) {
        setFormData(prev => ({
          ...prev,
          product_id: pid,
          title: data.data.title || "",
          description: data.data.description || "",
          image_url: data.data.image_url || "",
          is_active: !!data.data.is_active,
        }));
        setHasExisting(true);
      } else {
        setFormData(prev => ({ ...prev, product_id: pid, title: "", description: "", image_url: "", is_active: true }));
        setHasExisting(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/admin/product-specs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: Number(formData.product_id),
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
          is_active: formData.is_active,
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Specification saved successfully');
        onSuccess();
      } else {
        setError(data.message || 'Failed to save specification');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!formData.product_id) return;
    if (!confirm('Delete this specification?')) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/product-specs/${formData.product_id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        alert('Specification deleted');
        setFormData({ product_id: formData.product_id, title: "", description: "", image_url: "", is_active: true });
        setHasExisting(false);
        onSuccess();
      } else {
        setError(data.message || 'Failed to delete specification');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Add / Update Specification</h3>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <div className="mt-1">
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    const chosen = products.find((p) => String(p.id) === String(formData.product_id));
                    if (chosen && chosen.category !== e.target.value) {
                      setFormData(prev => ({ ...prev, product_id: "" }));
                    }
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="commercial-industrial-ess">Commercial & Industrial ESS</option>
                  <option value="large-scale-energy-storage">Large Scale Energy Storage</option>
                  <option value="residential-energy-storage">Residential Energy Storage</option>
                  <option value="rack-mounted-batteries">Rack Mounted Batteries</option>
                  <option value="hybrid-energy-storage-cabinets">Hybrid Energy Storage Cabinets</option>
                  <option value="mobile-ev-charging-storage">Mobile & EV Charging Storage</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Product</label>
              <div className="mt-1">
                <select name="product_id" id="product_id" value={formData.product_id} onChange={(e) => { handleChange(e); loadExisting(e.target.value); }} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                  <option value="">Select a product</option>
                  {(selectedCategory ? products.filter((p) => p.category === selectedCategory) : products).map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title *</label>
              <div className="mt-1">
                <input type="text" name="title" id="title" required value={formData.title} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <div className="mt-1">
                <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Specification Image</label>
              <div className="mt-1">
                <ImageUpload onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))} currentImageUrl={formData.image_url} />
                {formData.image_url && (<div className="mt-2 text-sm text-gray-500">Current URL: {formData.image_url}</div>)}
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="flex items-center">
                <input id="is_active" name="is_active" type="checkbox" checked={formData.is_active} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">Active</label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Cancel</button>
            {hasExisting && (
              <button type="button" onClick={handleDelete} disabled={loading} className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50">Delete</button>
            )}
            <button type="submit" disabled={loading} className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50">{loading ? 'Saving...' : 'Save Specification'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
