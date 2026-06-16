'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  range?: number; // magnetic range
  strength?: number; // strength multiplier
  className?: string;
}

export function MagneticButton({
  children,
  range = 60,
  strength = 0.35,
  className,
}: MagneticButtonProps) {
  const isReduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  if (isReduced) {
    return React.createElement('div', { className }, children);
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return React.createElement(
    motion.div,
    {
      ref,
      className,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      animate: { x: position.x, y: position.y },
      transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
    },
    children
  );
}
