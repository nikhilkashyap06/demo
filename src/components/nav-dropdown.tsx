"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  description?: string;
  items?: NavItem[];
}

interface NavDropdownProps {
  item: NavItem;
  isActive: boolean;
}

export function NavDropdown({ item, isActive }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div 
      className="relative group"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          className={cn(
            "px-3 py-2 text-sm font-medium nav-item transition-colors duration-200 relative group",
            isActive || isOpen ? "text-green-600 active" : "text-gray-800 hover:text-green-600"
          )}
        >
          {item.label}
          <span className={cn(
            "absolute bottom-0 left-3 right-3 h-0.5 bg-green-600 transform scale-x-0 transition-transform duration-200 origin-left",
            (isActive || isOpen) ? 'scale-x-100' : 'group-hover:scale-x-100'
          )}></span>
        </Link>
        {item.items && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none ml-1"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <svg
              className={`h-4 w-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
          className={cn(
            "absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 transition-all duration-200 origin-top",
            isOpen 
              ? 'opacity-100 scale-100 visible' 
              : 'opacity-0 scale-95 invisible'
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.items.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-150 nav-item"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-medium">{subItem.label}</div>
              {subItem.description && (
                <p className="text-xs text-gray-500 mt-1">{subItem.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
