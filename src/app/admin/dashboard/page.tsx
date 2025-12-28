"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    solutions: 0,
    labEquipment: 0,
    heroSlides: 0,
    news: 0,
    contactRequests: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch stats once and then poll periodically to keep counts up-to-date
  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats', { cache: 'no-store' });
        const data = await response.json();
        if (isMounted && data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Animated number component for smooth increment/decrement when values change
  function AnimatedNumber({ value }: { value: number }) {
    const [display, setDisplay] = useState<number>(value);
    const prev = useRef<number>(value);

    useEffect(() => {
      const start = prev.current;
      const end = value;
      prev.current = end;
      if (start === end) {
        setDisplay(end);
        return;
      }
      const duration = 500;
      const startTime = performance.now();
      let raf = 0 as unknown as number;
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOut = progress * (2 - progress);
        const current = Math.round(start + (end - start) * easeOut);
        setDisplay(current);
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [value]);

    return <span>{display}</span>;
  }

  const statCards = [
    { name: 'Total Products', value: stats.products, icon: '📦', badgeColor: 'bg-blue-500', bgColor: 'bg-blue-50', href: '/admin/products' },
    { name: 'Total Solutions', value: stats.solutions, icon: '💡', badgeColor: 'bg-green-500', bgColor: 'bg-green-50', href: '/admin/solutions' },
    { name: 'Lab Equipment', value: stats.labEquipment, icon: '🔬', badgeColor: 'bg-purple-500', bgColor: 'bg-purple-50', href: '/admin/lab-equipment' },
    { name: 'Hero Slides', value: stats.heroSlides, icon: '🖼️', badgeColor: 'bg-yellow-500', bgColor: 'bg-yellow-50', href: '/admin/hero-slides' },
    { name: 'Total News', value: stats.news, icon: '📰', badgeColor: 'bg-teal-500', bgColor: 'bg-teal-50', href: '/admin/news' },
    { name: 'Contact Requests', value: stats.contactRequests, icon: '✉️', badgeColor: 'bg-indigo-500', bgColor: 'bg-indigo-50', href: '/admin/contact-requests' },
  ];

  const managementCards = [
    {
      name: 'Products',
      href: '/admin/products',
      description: 'Add, edit, and delete products',
      stat: stats.products,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      icon: '📦'
    },
    {
      name: 'Solutions',
      href: '/admin/solutions',
      description: 'Manage solution offerings and details',
      stat: stats.solutions,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      icon: '💡'
    },
    {
      name: 'Lab Equipment',
      href: '/admin/lab-equipment',
      description: 'Maintain lab equipment catalog',
      stat: stats.labEquipment,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      icon: '🔬'
    },
    {
      name: 'Hero Section',
      href: '/admin/hero-slides',
      description: 'Update homepage hero slides',
      stat: stats.heroSlides,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: '🖼️'
    },
    {
      name: 'News',
      href: '/admin/news',
      description: 'Publish and manage news articles',
      stat: stats.news,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      icon: '📰'
    },
    {
      name: 'Contact Requests',
      href: '/admin/contact-requests',
      description: 'View and manage contact form submissions',
      stat: stats.contactRequests,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      icon: '✉️'
    },
  ];

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your admin panel. Here you can manage all your content.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className={`overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow ${card.bgColor}`}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${card.badgeColor}`}>
                  <span className="text-white text-xl">{card.icon}</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {card.name}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {loading ? (
                        <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
                      ) : (
                        <AnimatedNumber value={card.value as number} />
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Management cards */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {managementCards.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              className={`group block rounded-lg border border-slate-200 shadow hover:shadow-lg transition-shadow ${card.bgColor}`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-md bg-gradient-to-br p-3 from-slate-800 to-slate-700">
                      <span className="text-white text-xl">{card.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {card.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 hidden">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <div className={`rounded-md px-3 py-2 text-xs font-semibold text-white bg-gradient-to-br ${card.color}`}>
                    {loading ? (
                      <span className="inline-block h-4 w-8 bg-white/30 rounded animate-pulse" />
                    ) : (
                      <span><AnimatedNumber value={card.stat as number} /></span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center text-green-600 text-sm font-medium">
                  Manage {card.name}
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}