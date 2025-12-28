'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ParallaxAnimation } from './parallax-animation';

type BatteryType = 'low' | 'high' | 'industrial' | 'commercial' | 'residential';

interface BatteryInfo {
  type: BatteryType;
  title: string;
  model: string;
  image: string;
}

const batteryData: Record<string, BatteryInfo> = {
  'battery1': {
    type: 'low',
    title: 'Low Voltage',
    model: 'B-LFP48-300PW',
    image: '/1/ion1.png',
  },
  'battery2': {
    type: 'high',
    title: 'High Voltage',
    model: 'B-HV-500PW',
    image: '/1/ion2.png',
  },
  'battery3': {
    type: 'industrial',
    title: 'Industrial Grade',
    model: 'B-IND-1000PW',
    image: '/1/ion3.png',
  },
  'battery4': {
    type: 'commercial',
    title: 'Commercial Series',
    model: 'B-COM-800PW',
    image: '/1/ion4.png',
  },
  'battery5': {
    type: 'residential',
    title: 'Residential Solution',
    model: 'B-RES-400PW',
    image: '/1/ion5.png',
  },
};

export function BatteryShowcase() {
  const [activeBattery, setActiveBattery] = useState<BatteryType>('low');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const batteryTypes = Object.keys(batteryData) as BatteryType[];
  const currentData = batteryData[activeBattery] || batteryData[batteryTypes[0]];

  // Auto-rotate slides every 2 seconds
  useEffect(() => {
    if (batteryTypes.length === 0) return;
    
    const timer = setInterval(() => {
      const nextIndex = (currentSlide + 1) % batteryTypes.length;
      setCurrentSlide(nextIndex);
      setActiveBattery(batteryTypes[nextIndex]);
    }, 2000);

    return () => clearInterval(timer);
  }, [currentSlide, batteryTypes]);

  // Create a ref for the section
  const sectionRef = useRef<HTMLElement>(null);
  
  // Initialize parallax effects after component mounts
  const bgRef = useRef<HTMLDivElement>(null);
  const batteryRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Set up parallax effects after refs are available
  useEffect(() => {
    if (bgRef.current && batteryRef.current && textRef.current) {
      // These will be used by the Parallax components
    }
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden"
      >
        {/* Background pattern with parallax */}
        <ParallaxAnimation speed={-10}>
          <div className="absolute inset-0 opacity-10" ref={bgRef}>
            <div className="absolute inset-0 bg-[url('/public/imagegreen2/1.png')] bg-center bg-cover"></div>
          </div>
        </ParallaxAnimation>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center" ref={textRef}>
            {/* Left side - Battery type selector */}
            <div className="space-y-8">
              {batteryTypes.map((type) => {
                const data = batteryData[type];
                return (
                  <div 
                    key={type}
                    className={`cursor-pointer transition-all duration-300 p-6 rounded-lg ${
                      activeBattery === type 
                        ? 'bg-gray-800 border-l-4 border-green-500' 
                        : 'bg-gray-800/50 hover:bg-gray-800/70'
                    }`}
                    onClick={() => {
                      setActiveBattery(type as BatteryType);
                      setCurrentSlide(batteryTypes.indexOf(type));
                    }}
                  >
                    <div className="flex items-center">
                      <span className={`text-2xl font-bold mr-4 ${
                        activeBattery === type ? 'text-green-500' : 'text-gray-500'
                      }`}>
                        {batteryTypes.indexOf(type) + 1 < 10 ? `0${batteryTypes.indexOf(type) + 1}` : batteryTypes.indexOf(type) + 1}
                      </span>
                      <div>
                        <h3 className={`text-2xl font-bold ${
                          activeBattery === type ? 'text-white' : 'text-gray-400'
                        }`}>
                          {data.title}
                        </h3>
                        <p className="text-gray-500">{data.model}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center - Battery image with flip animation and parallax */}
            <ParallaxAnimation speed={5}>
              <div className="relative h-[500px] w-full" ref={batteryRef}>
                <div className="relative h-full w-full perspective-[1000px] transform-style-preserve-3d">
                  <AnimatePresence mode="wait">
                    {currentData && (
                      <motion.div
                        key={currentData.type}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full h-full"
                      >
                        <Image
                          src={currentData.image || '/placeholder-battery.png'}
                          alt={currentData.title || 'Battery Image'}
                          fill
                          className="object-contain"
                          priority
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Pagination dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {batteryTypes.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          currentSlide === index ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                        onClick={() => {
                          setCurrentSlide(index);
                          setActiveBattery(batteryTypes[index]);
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ParallaxAnimation>

            {/* Right side - CTA */}
            <div className="space-y-8">
              <div className="flex flex-col items-end">
                <div className="text-right mb-8">
                  <h2 className="text-5xl font-bold mb-4">
                    {currentData?.title?.toUpperCase() || 'BATTERY SOLUTIONS'}
                  </h2>
                  <p className="text-gray-400">
                    {currentData 
                      ? `Advanced ${currentData.title} solutions for your energy needs`
                      : 'Advanced energy storage solutions for your needs'}
                  </p>
                </div>
                
                <div className="text-right space-y-6">
                  <Link 
                    href="/contact" 
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
                  >
                    Online Service
                  </Link>
                  
                  <div className="flex items-center justify-end space-x-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                    <span>VIEW MORE</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionize Power Generation section */}
      <section className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Revolutionize Power Generation with Lithium Batteries
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Experience the next generation of energy storage solutions with our advanced lithium battery technology.
          </p>
          <a 
            href="https://www.bsl-battery.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>
    </>
  );
}
