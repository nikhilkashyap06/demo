"use client";

import { useState, useEffect } from "react";
import ImageUpload from "../components/image-upload";

export default function NewsForm({ 
  item, 
  onSuccess, 
  onCancel 
}: { 
  item: any; 
  onSuccess: () => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image_url: "",
    publish_date: "",
    is_published: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      const pd = item.publish_date ? new Date(item.publish_date) : null;
      setFormData({
        title: item.title || "",
        summary: item.summary || "",
        content: item.content || "",
        image_url: item.image_url || "",
        publish_date: pd ? pd.toISOString().slice(0, 10) : "",
        is_published: item.is_published ? true : false,
      });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = item ? `/api/admin/news/${item.id}` : '/api/admin/news';
      const method = item ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert(item ? 'News updated successfully' : 'News created successfully');
        onSuccess();
      } else {
        setError(data.message || 'Failed to save news');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">{item ? 'Edit News' : 'Add News'}</h2>
        <button onClick={onCancel} className="text-sm text-gray-600 hover:text-gray-800">Cancel</button>
      </div>

      {error && (
        <div className="mb-4 rounded bg-red-50 text-red-700 px-4 py-2 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
          <textarea
            id="summary"
            name="summary"
            rows={3}
            value={formData.summary}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            name="content"
            rows={6}
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <div className="mt-1">
            <ImageUpload
              onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              currentImageUrl={formData.image_url}
            />
            {formData.image_url && (
              <div className="mt-2 text-sm text-gray-500">Current URL: {formData.image_url}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="publish_date" className="block text-sm font-medium text-gray-700">Publish Date</label>
            <input
              id="publish_date"
              name="publish_date"
              type="date"
              value={formData.publish_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              id="is_published"
              name="is_published"
              type="checkbox"
              checked={formData.is_published}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">Published</label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {loading ? 'Saving...' : (item ? 'Update News' : 'Create News')}
          </button>
        </div>
      </form>
    </div>
  );
}
