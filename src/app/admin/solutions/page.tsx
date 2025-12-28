"use client";

import { useState, useEffect } from "react";
import SolutionForm from "./solution-form";
import SolutionList from "./solution-list";

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSolution, setEditingSolution] = useState<any>(null);

  const fetchSolutions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/solutions');
      const data = await response.json();
      
      if (data.success) {
        setSolutions(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch solutions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const handleEdit = (solution: any) => {
    setEditingSolution(solution);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this solution?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/solutions/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Solution deleted successfully');
        fetchSolutions(); // Refresh the list
      } else {
        alert('Failed to delete solution: ' + data.message);
      }
    } catch (error) {
      console.error('Failed to delete solution:', error);
      alert('Failed to delete solution');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSolution(null);
    fetchSolutions(); // Refresh the list
  };

  return (
    <div className="py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solutions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your solution offerings
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => {
              setEditingSolution(null);
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Solution
          </button>
        </div>
      </div>

      {showForm ? (
        <SolutionForm
          solution={editingSolution}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingSolution(null);
          }}
        />
      ) : (
        <SolutionList
          solutions={solutions}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}