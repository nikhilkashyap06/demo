"use client";

import { useState, useEffect } from "react";
import LabEquipmentForm from "./lab-equipment-form";
import LabEquipmentList from "./lab-equipment-list";

export default function LabEquipmentPage() {
  const [labEquipment, setLabEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchLabEquipment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/lab-equipment');
      const data = await response.json();
      
      if (data.success) {
        setLabEquipment(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch lab equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabEquipment();
  }, []);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lab equipment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/lab-equipment/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Lab equipment deleted successfully');
        fetchLabEquipment(); // Refresh the list
      } else {
        alert('Failed to delete lab equipment: ' + data.message);
      }
    } catch (error) {
      console.error('Failed to delete lab equipment:', error);
      alert('Failed to delete lab equipment');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchLabEquipment(); // Refresh the list
  };

  return (
    <div className="py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lab Equipment</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your laboratory equipment catalog
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Equipment
          </button>
        </div>
      </div>

      {showForm ? (
        <LabEquipmentForm
          item={editingItem}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      ) : (
        <LabEquipmentList
          equipment={labEquipment}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}