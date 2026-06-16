'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, duration = 0.5, y = 24, className }: FadeInProps) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return React.createElement('div', { className }, children);
  }

  return React.createElement(
    motion.div,
    {
      className,
      variants: {
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        },
      },
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-10% 0px' },
    },
    children
  );
}
