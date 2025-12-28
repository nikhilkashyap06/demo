'use client';

import { useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

interface ParallaxAnimationProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxAnimation({ children, speed = 10, className = '' }: ParallaxAnimationProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Parallax speed={speed}>
      <div className={className}>{children}</div>
    </Parallax>
  );
}