'use client';

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

type Slide = {
  id: number;
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
  image_url: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Welcome to ION Green",
    description: "Leading provider of sustainable energy solutions",
    cta_label: "Explore Products",
    cta_href: "/products",
    image_url: "/1/ion1.png",
  },
  {
    id: 2,
    title: "Innovative Solar Solutions",
    description: "Harness the power of the sun with our advanced technology",
    cta_label: "Learn More",
    cta_href: "/solutions",
    image_url: "/1/ion2.png",
  },
  {
    id: 3,
    title: "Energy Storage Systems",
    description: "Efficient and reliable energy storage for your needs",
    cta_label: "View Products",
    cta_href: "/products/storage",
    image_url: "/1/ion3.png",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-scroll effect with pause on hover
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  return (
    <div 
      className="relative w-full h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full">
        {/* Carousel Items */}
        <div className="relative w-full h-full transition-transform duration-1000 ease-in-out">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`carousel-item absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 pointer-events-none z-0'
              }`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                transition: 'opacity 1000ms ease-in-out, transform 1000ms ease-in-out'
              }}
            >
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Caption at the bottom */}
              <div className="carousel-caption absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-white">
                <div className="container mx-auto">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-4">{slide.description}</p>
                  <a href={slide.cta_href}>
                    <Button className="bg-green-600 hover:bg-green-700">
                      {slide.cta_label}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-8 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
