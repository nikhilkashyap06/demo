'use client';

import { useState, useEffect, useRef, Children, isValidElement } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ParallaxAnimation } from './parallax-animation';

interface AdvancedAnimationProps {
  children: React.ReactNode;
  animationType: 'parallax' | 'textReveal' | 'imageZoom' | 'typing' | 'splitScreen' | 'floating' | 'stagger' | 'svgDraw';
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  text?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
  parallaxSpeed?: number;
  maskReveal?: boolean;
  splitDirection?: 'horizontal' | 'vertical';
}

export function AdvancedAnimation({ 
  children, 
  animationType, 
  className = '',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  direction = 'up',
  text,
  staggerChildren = false,
  staggerDelay = 0.1,
  parallaxSpeed = 10,
  maskReveal = false,
  splitDirection = 'horizontal',
  ...props
}: AdvancedAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", amount: threshold });

  switch (animationType) {
    case 'parallax':
      return (
        <ParallaxAnimation speed={parallaxSpeed}>
          <div ref={ref} className={className}>
            {children}
          </div>
        </ParallaxAnimation>
      );

    case 'textReveal':
      return (
        <TextReveal 
          text={text || ''} 
          duration={duration} 
          className={className}
          maskReveal={maskReveal}
        >
          {children}
        </TextReveal>
      );

    case 'imageZoom':
      return (
        <ImageZoom 
          duration={duration} 
          className={className}
          inView={isInView}
        >
          {children}
        </ImageZoom>
      );

    case 'typing':
      return (
        <TypingAnimation 
          text={text || ''} 
          duration={duration} 
          className={className}
        />
      );

    case 'splitScreen':
      return (
        <SplitScreenReveal 
          direction={splitDirection}
          duration={duration} 
          className={className}
          inView={isInView}
        >
          {children}
        </SplitScreenReveal>
      );

    case 'floating':
      return (
        <FloatingAnimation 
          duration={duration} 
          className={className}
          inView={isInView}
        >
          {children}
        </FloatingAnimation>
      );

    case 'stagger':
      return (
        <StaggerAnimation 
          duration={duration} 
          delay={delay}
          staggerDelay={staggerDelay}
          staggerChildren={staggerChildren}
          className={className}
          inView={isInView}
        >
          {children}
        </StaggerAnimation>
      );

    case 'svgDraw':
      return (
        <SVGDrawAnimation 
          duration={duration} 
          className={className}
          inView={isInView}
        >
          {children}
        </SVGDrawAnimation>
      );

    default:
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0 }}
          transition={{ duration, delay }}
          className={className}
        >
          {children}
        </motion.div>
      );
  }
}

// Text Reveal with Masking Animation
interface TextRevealProps {
  text: string;
  children?: React.ReactNode;
  duration?: number;
  className?: string;
  maskReveal?: boolean;
}

export function TextReveal({ text, children, duration, className = '', maskReveal = false }: TextRevealProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, (duration || 0.6) * 100);

      return () => clearTimeout(timeout);
    } else {
      setIsRevealed(true);
    }
  }, [currentIndex, text, duration]);

  if (maskReveal) {
    return (
      <div className={className}>
        <div className="overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-bold relative">
            <span className="inline-block">{text}</span>
            <span 
              className="absolute top-0 left-0 h-full bg-white dark:bg-gray-900"
              style={{
                width: isRevealed ? '0%' : '100%',
                transition: `width ${duration}s ease-in-out`,
                transformOrigin: 'left'
              }}
            />
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="text-4xl md:text-5xl font-bold">
        {displayText}
        <span className="animate-pulse">|</span>
      </h2>
      {children}
    </div>
  );
}

// Image Zoom on Scroll
interface ImageZoomProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  inView?: boolean;
}

export function ImageZoom({ children, duration, className = '', inView }: ImageZoomProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1 }}
      animate={inView ? { scale: 1.1 } : { scale: 1 }}
      transition={{ duration: duration || 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// Typing Animation
interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export function TypingAnimation({ text, duration, className = '' }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className={className}>
      <h2 className="text-3xl md:text-4xl font-bold">
        {displayText}
        <span className="ml-1 animate-pulse">|</span>
      </h2>
    </div>
  );
}

// Split Screen Reveal Animation
interface SplitScreenRevealProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  duration?: number;
  className?: string;
  inView?: boolean;
}

export function SplitScreenReveal({ children, direction, duration, className = '', inView }: SplitScreenRevealProps) {
  const splitStyle = direction === 'horizontal' 
    ? { 
        clipPath: inView ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
      } 
    : { 
        clipPath: inView ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
      };

  return (
    <motion.div
      className={className}
      style={splitStyle}
      transition={{ duration: duration || 0.8, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// Floating/Bouncing Icons Animation
interface FloatingAnimationProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  inView?: boolean;
}

export function FloatingAnimation({ children, duration, className = '', inView }: FloatingAnimationProps) {
  return (
    <motion.div
      className={className}
      animate={inView ? {
        y: [0, -10, 0],
        x: [0, 5, 0],
      } : { y: 0, x: 0 }}
      transition={{
        duration: duration || 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger Animation for Cards/Lists
interface StaggerAnimationProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  staggerChildren?: boolean;
  className?: string;
  inView?: boolean;
}

export function StaggerAnimation({ 
  children, 
  duration, 
  delay, 
  staggerDelay, 
  staggerChildren, 
  className = '', 
  inView 
}: StaggerAnimationProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren ? staggerDelay || 0.1 : 0
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ duration: duration || 0.5, delay: delay || 0 }}
    >
      {Array.isArray(children) ? 
        children.map((child, index) => (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        )) : 
        children
      }
    </motion.div>
  );
}

// SVG Line-Drawing Animation
interface SVGDrawAnimationProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  inView?: boolean;
}

export function SVGDrawAnimation({ children, duration, className = '', inView }: SVGDrawAnimationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
    >
      {children}
    </svg>
  );
}