"use client";

import { useState, useEffect } from "react";
import ImageUpload from "../components/image-upload";

export default function HeroSlideForm({ 
  slide, 
  onSuccess, 
  onCancel 
}: { 
  slide: any; 
  onSuccess: () => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cta_label: "",
    cta_href: "",
    image_url: "",
    category: "", // Add category field
    position: 1,
    is_active: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title || "",
        description: slide.description || "",
        cta_label: slide.cta_label || "",
        cta_href: slide.cta_href || "",
        image_url: slide.image_url || "",
        category: slide.category || "", // Add category field
        position: slide.position || 1,
        is_active: slide.is_active !== undefined ? slide.is_active : true
      });
    }
  }, [slide]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = slide ? `/api/admin/hero-slides/${slide.id}` : '/api/admin/hero-slides';
      const method = slide ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(slide ? 'Hero slide updated successfully' : 'Hero slide created successfully');
        onSuccess();
      } else {
        setError(data.message || 'Failed to save hero slide');
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
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {slide ? 'Edit Hero Slide' : 'Add New Hero Slide'}
        </h3>
        
        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="cta_label" className="block text-sm font-medium text-gray-700">
                CTA Label
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="cta_label"
                  id="cta_label"
                  value={formData.cta_label}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="cta_href" className="block text-sm font-medium text-gray-700">
                CTA Link
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="cta_href"
                  id="cta_href"
                  value={formData.cta_href}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Slide Image *
              </label>
              <div className="mt-1">
                <ImageUpload 
                  onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                  currentImageUrl={formData.image_url}
                />
                {formData.image_url && (
                  <div className="mt-2 text-sm text-gray-500">
                    Current URL: {formData.image_url}
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="position"
                  id="position"
                  min="1"
                  value={formData.position}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Add Category Field */}
            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="Home">Home</option>
                  <option value="Products">Products</option>
                  <option value="Solutions">Solutions</option>
                  <option value="Lab Equipment">Lab Equipment</option>
                  <option value="About">About</option>
                  <option value="Contact">Contact</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="flex items-center mt-6">
                <input
                  id="is_active"
                  name="is_active"
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (slide ? 'Update Slide' : 'Create Slide')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}