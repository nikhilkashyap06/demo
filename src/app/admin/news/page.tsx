"use client";

import { useState, useEffect } from "react";
import NewsForm from "./news-form";
import NewsList from "./news-list";

export default function NewsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/news');
      const data = await response.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        alert('News deleted successfully');
        fetchNews();
      } else {
        alert('Failed to delete news: ' + data.message);
      }
    } catch (error) {
      console.error('Failed to delete news:', error);
      alert('Failed to delete news');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchNews();
  };

  return (
    <div className="py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your news articles</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => { setEditingItem(null); setShowForm(true); }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add News
          </button>
        </div>
      </div>

      {showForm ? (
        <NewsForm
          item={editingItem}
          onSuccess={handleFormSuccess}
          onCancel={() => { setShowForm(false); setEditingItem(null); }}
        />
      ) : (
        <NewsList
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

