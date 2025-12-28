"use client";

import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { useState } from "react";
import { DetailModal } from "./detail-modal";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  image_url?: string | null;
  publish_date: string | Date;
  created_at: string | Date;
}

// Better Ion Green related images for news
const newsImages = [
  "/1/ion1.png",
  "/1/ion2.png",
  "/1/ion3.png",
  "/2/green.png",
  "/3/green1.png",
  "/3/green2.png"
];

function NewsFeedClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    title: "",
    image: "",
    description: "",
    detailedContent: ""
  });

  const openModal = (item: NewsItem) => {
    const imageUrl = item.image_url || newsImages[item.id % newsImages.length];
    setSelectedItem({
      title: item.title,
      image: imageUrl,
      description: item.summary || "",
      detailedContent: item.content || ""
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {initialNews.map((item: NewsItem, index: number) => {
          // Use local images in sequence
          const imageUrl = item.image_url || newsImages[index % newsImages.length];
          const publishLabel = typeof item.publish_date === 'string'
            ? item.publish_date
            : item.publish_date instanceof Date
              ? item.publish_date.toISOString().slice(0, 10)
              : String(item.publish_date ?? '');
          
          return (
            <article
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    {publishLabel}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 flex-grow line-clamp-3">
                    {item.summary}
                </p>
                
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {typeof item.created_at === 'string' 
                      ? new Date(item.created_at).toISOString().split('T')[0] // YYYY-MM-DD format
                      : item.created_at instanceof Date 
                        ? item.created_at.toISOString().split('T')[0] // YYYY-MM-DD format
                        : ''}
                  </span>
                  <button 
                    onClick={() => openModal(item)}
                    className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                  >
                    Read more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      
      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedItem.title}
        image={selectedItem.image}
        description={selectedItem.description}
        detailedContent={selectedItem.detailedContent}
      />
    </>
  );
}

// Server component wrapper
export function NewsFeed({ news }: { news: NewsItem[] }) {
  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="News"
          title="Latest Updates"
          description="Company news, exhibitions, and BESS deployment highlights."
        />
        
        <NewsFeedClient initialNews={news} />
      </div>
    </section>
  );
}