'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, duration = 0.6, className }: RevealProps) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return React.createElement('div', { className }, children);
  }

  return React.createElement(
    motion.div,
    {
      className,
      variants: {
        hidden: { clipPath: 'inset(0 100% 0 0)' },
        visible: {
          clipPath: 'inset(0 0% 0 0)',
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
