import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';

interface ProductImageMagnifierProps {
  src: string;
  alt: string;
}

export default function ProductImageMagnifier({ src, alt }: ProductImageMagnifierProps) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for real-time physics tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end heavy-glass fluid lag feeling
  const springX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  // Map spring coordinate values to background position percentage
  const bgPosition = useTransform(
    [springX, springY],
    ([xVal, yVal]) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return '50% 50%';
      const centerX = (xVal as number) + 75; // Adjust back to center of the 150px lens
      const centerY = (yVal as number) + 75;
      const pctX = Math.max(0, Math.min(100, (centerX / rect.width) * 100));
      const pctY = Math.max(0, Math.min(100, (centerY / rect.height) * 100));
      return `${pctX}% ${pctY}%`;
    }
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set initial position instantly on entry to prevent springing from 0,0
    mouseX.set(x - 75);
    mouseY.set(y - 75);
    setHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x - 75);
    mouseY.set(y - 75);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-none overflow-hidden select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Base high-resolution product image with continuous subtle scale and depth-of-field blur on hover */}
      <motion.img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        animate={{ 
          scale: hovered ? 1.05 : 1,
          filter: hovered ? 'blur(1.5px) brightness(0.75)' : 'blur(0px) brightness(1)'
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* Loupe Lens overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="absolute pointer-events-none rounded-full border-[3px] border-amber-400/90 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),_inset_0_4px_12px_rgba(255,255,255,0.4),_inset_0_-4px_12px_rgba(0,0,0,0.6)] z-30"
            style={{
              width: '150px',
              height: '150px',
              left: springX,
              top: springY,
              backgroundImage: `url(${src})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '280% 280%',
              backgroundPosition: bgPosition,
            }}
          >
            {/* Glossy reflection lines inside the lens */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
            
            {/* Center crosshair to simulate professional inspection tools */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-[1px] bg-gold-400/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-[1px] bg-gold-400/30" />
            
            {/* Loupe rim gold sheen label */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-widest text-gold-400/80 bg-neutral-950/80 px-1 rounded uppercase font-bold">
              LOUPE 3X
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
