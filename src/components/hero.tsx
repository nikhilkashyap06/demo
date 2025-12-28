"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";

const hero = getSiteContent().hero;

interface StaticHeroSlide {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

interface DynamicHeroSlide {
  id: number;
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
  image_url: string;
  position: number;
}

type HeroSlide = StaticHeroSlide | DynamicHeroSlide;

interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  page?: string;
  children?: React.ReactNode;
  slides?: DynamicHeroSlide[]; // Add slides prop for dynamic content
}

// Type guard to check if slide is dynamic
function isDynamicSlide(slide: HeroSlide): slide is DynamicHeroSlide {
  return 'id' in slide && 'image_url' in slide;
}

export function Hero({ page = 'home', children, className, slides: externalSlides, ...props }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Use external slides if provided and not empty, otherwise use static content
  const slides = (externalSlides && externalSlides.length > 0) ? externalSlides : hero.slides;
  
  // Define background images for different pages using local images
  const pageBackgrounds = {
    home: '/1/ion1.png',
    about: '/1/ion2.png',
    products: '/1/ion3.png',
    solutions: '/1/ion4.png',
    'case': '/1/ion5.png',
    'case-studies': '/1/ion6.png',
    news: '/2/green.png',
    contact: '/3/green1.png',
    support: '/3/green2.png',
    'lab-equipment': '/3/green3.png',
  };
  
  const currentBackground = pageBackgrounds[page as keyof typeof pageBackgrounds] || pageBackgrounds.home;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  // Helper function to get slide properties
  const getSlideImageUrl = (slide: HeroSlide) => {
    return isDynamicSlide(slide) ? slide.image_url : slide.image;
  };

  const getSlideCtaHref = (slide: HeroSlide) => {
    return isDynamicSlide(slide) ? slide.cta_href : slide.ctaHref;
  };

  const getSlideCtaLabel = (slide: HeroSlide) => {
    return isDynamicSlide(slide) ? slide.cta_label : slide.ctaLabel;
  };

  return (
    <section className={cn("relative h-screen max-h-[800px] overflow-hidden text-white", className)} {...props}>
      {/* Navigation Arrows */}
      {page === 'home' && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-green-600 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-green-600 hover:scale-110"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      <div className="relative h-full w-full">
        {page === 'home' ? (
          <>
            {slides.map((slide, index) => (
              <div 
                key={getSlideImageUrl(slide) || index} 
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out" 
                aria-hidden={activeIndex !== index}
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                }}
              >
                <Image
                  src={getSlideImageUrl(slide)}
                  alt={slide.title}
                  fill
                  className="object-cover fade-in"
                  priority={index === 0}
                  quality={100}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                
                {/* Product overlay on the right side - similar to BSL Battery */}
                <div className="absolute right-0 top-1/2 hidden h-full w-1/2 -translate-y-1/2 transform md:block">
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/hero-product.png" // This should be your product image
                      alt="Ion Green Product"
                      fill
                      className="object-contain object-right fade-in"
                      priority
                      quality={100}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="absolute inset-0">
            <Image
              src={currentBackground}
              alt={`${page} background`}
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 py-16 md:px-8 lg:px-12">
          {children || (
            <div className="w-full max-w-2xl space-y-6">
              <ScrollReveal direction="up" duration={0.8} delay={0.1}>
                <div className="space-y-4">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-400">
                    {hero.eyebrow || 'INNOVATIVE ENERGY SOLUTIONS'}
                  </p>
                  <div className="space-y-6" aria-live="polite">
                    <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                      {slides[activeIndex]?.title || 'Powering a Sustainable Future'}
                    </h1>
                    <p className="max-w-lg text-lg font-light leading-relaxed text-white/90">
                      {slides[activeIndex]?.description || 'High-performance energy storage solutions for residential and commercial applications'}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" duration={0.8} delay={0.2}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href={getSlideCtaHref(slides[activeIndex]) || '/contact'}
                    className="rounded-sm bg-green-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                  >
                    {getSlideCtaLabel(slides[activeIndex]) || 'Get a Free Quote'}
                  </Link>
                  <Link
                    href="/products"
                    className="flex items-center gap-2 rounded-sm border border-white/30 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
                  >
                    <span>Explore Products</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          )}
          {/* Pagination Dots - Bottom Center */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-1.5 w-6 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-green-500" : "bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}