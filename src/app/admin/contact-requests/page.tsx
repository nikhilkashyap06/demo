"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ContactRequest {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

export default function ContactRequestsPage() {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        const response = await fetch('/api/admin/contact-requests');
        const data = await response.json();
        
        if (data.success) {
          setContactRequests(data.data);
        } else {
          setError(data.message || 'Failed to fetch contact requests');
        }
      } catch (err) {
        setError('Failed to fetch contact requests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactRequests();
  }, []);

  if (loading) {
    return (
      <div className="py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Contact Requests</h1>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Contact Requests</h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="text-red-800">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contact Requests</h1>
        <Link 
          href="/admin/dashboard"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>

      {contactRequests.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">📭</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contact requests yet</h3>
          <p className="text-gray-500">
            Contact form submissions will appear here once received.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {contactRequests.map((request) => (
              <li key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {request.name}
                      </h3>
                      {request.company && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {request.company}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500 truncate">
                      {request.email}
                    </p>
                    <p className="mt-3 text-sm text-gray-700">
                      {request.message}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 text-sm text-gray-500">
                    {new Date(request.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}