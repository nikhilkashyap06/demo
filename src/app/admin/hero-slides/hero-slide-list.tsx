"use client";

export default function HeroSlideList({ 
  slides, 
  loading, 
  onEdit, 
  onDelete 
}: { 
  slides: any[]; 
  loading: boolean; 
  onEdit: (slide: any) => void; 
  onDelete: (id: number) => void; 
}) {
  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center py-4 border-b border-gray-200">
                <div className="h-16 w-16 bg-gray-200 rounded mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="h-8 w-20 bg-gray-200 rounded mr-2"></div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hero slides</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new hero slide.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {slides.map((slide) => (
          <li key={slide.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {slide.image_url ? (
                    <img 
                      src={slide.image_url} 
                      alt={slide.title} 
                      className="h-16 w-16 rounded object-cover mr-4"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded bg-gray-200 flex items-center justify-center mr-4">
                      <span className="text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-green-600 truncate">{slide.title}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {slide.category ? `${slide.category} - ` : ''}
                      Position: {slide.position}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {slide.is_active ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
                      Inactive
                    </span>
                  )}
                  <button
                    onClick={() => onEdit(slide)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(slide.id)}
                    className="ml-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {slide.description?.substring(0, 100)}...
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <span>CTA: {slide.cta_label || 'None'}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}