import Link from 'next/link';
import { getSiteContent } from '@/lib/content';
import { useState, useEffect, useRef } from 'react';

// Helper function for smooth scrolling to element
const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export function Navbar() {
  const { navItems } = getSiteContent();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors">
              Ion Green
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                <div className="flex items-center">
                  <Link 
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeDropdown === item.label ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                    } transition-colors duration-200`}
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToElement(item.href.substring(1));
                      }
                    }}
                    onMouseEnter={() => item.items && setActiveDropdown(item.label)}
                  >
                    {item.label}
                  </Link>
                  {item.items && (
                    <button 
                      onClick={() => toggleDropdown(item.label)}
                      className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      <svg 
                        className={`h-4 w-4 transform transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {item.items && (
                  <div 
                    className={`absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-10 transition-all duration-200 ${
                      activeDropdown === item.label 
                        ? 'opacity-100 translate-y-0 visible' 
                        : 'opacity-0 -translate-y-2 invisible'
                    }`}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-150"
                        onClick={(e) => {
                          setActiveDropdown(null);
                          if (subItem.href.startsWith('#')) {
                            e.preventDefault();
                            scrollToElement(subItem.href.substring(1));
                          }
                        }}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
