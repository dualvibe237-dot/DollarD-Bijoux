import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxSection({ children, className = '' }: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Capture scroll progress relative to this specific container entering the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Calculate dynamic transform mappings for a 3D parallax and luxury elastic feel
  // Scale-in gently as the section enters, reaching 100% at center
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.9, 1], [0.92, 1, 1, 0.92]);
  
  // Smoothly fade-in/fade-out based on viewport scroll positions
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [0.15, 1, 1, 0.15]);
  
  // Soft 3D tilt perspective translation to mimic a physical parallax depth layer
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full">
      <motion.div
        style={{ scale, opacity, y }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
