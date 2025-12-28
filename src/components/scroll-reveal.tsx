"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  TextReveal,
  ImageZoom,
  TypingAnimation,
  SplitScreenReveal,
  FloatingAnimation,
  StaggerAnimation,
  SVGDrawAnimation
} from './advanced-animations';
import { ParallaxAnimation } from './parallax-animation';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  effect?: "fade" | "slide" | "zoom" | "scale" | "flip" | "bounce" | "stagger" | "parallax" | "textReveal" | "imageZoom" | "typing" | "splitScreen" | "floating" | "svgDraw";
  threshold?: number;
  text?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
  parallaxSpeed?: number;
  maskReveal?: boolean;
  splitDirection?: 'horizontal' | 'vertical';
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  direction = "up",
  className = "",
  effect = "slide",
  threshold = 0.1,
  text,
  staggerChildren,
  staggerDelay = 0.1,
  parallaxSpeed = 10,
  maskReveal = false,
  splitDirection = 'horizontal',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", amount: threshold });
  
  const getVariants = () => {
    switch (effect) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      case "scale":
        return {
          hidden: { scale: 0.9 },
          visible: { scale: 1 }
        };
      case "slide":
      default:
        return {
          hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
          }
        };
      case "flip":
        return {
          hidden: { opacity: 0, rotateY: 90 },
          visible: { opacity: 1, rotateY: 0 }
        };
      case "bounce":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
      case "stagger":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  const variants = getVariants();

  // Handle special effects
  if (effect === "parallax") {
    return (
      <ParallaxAnimation speed={parallaxSpeed || 10} className={className}>
        {children}
      </ParallaxAnimation>
    );
  }
  
  if (effect === "textReveal") {
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
  }
  
  if (effect === "typing") {
    return (
      <TypingAnimation 
        text={text || ''} 
        duration={duration} 
        className={className}
      />
    );
  }
  
  if (effect === "splitScreen") {
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
  }
  
  if (effect === "floating") {
    return (
      <FloatingAnimation 
        duration={duration} 
        className={className}
        inView={isInView}
      >
        {children}
      </FloatingAnimation>
    );
  }
  
  if (effect === "svgDraw") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, pathLength: 0 }}
        animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
        transition={{ duration: duration || 2, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
  
  if (effect === "imageZoom") {
    return (
      <ImageZoom 
        duration={duration} 
        className={className}
        inView={isInView}
      >
        {children}
      </ImageZoom>
    );
  }
  
  if (effect === "stagger") {
    return (
      <StaggerAnimation 
        duration={duration} 
        delay={delay}
        staggerDelay={staggerDelay}
        staggerChildren={staggerChildren || false}
        className={className}
        inView={isInView}
      >
        {children}
      </StaggerAnimation>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}