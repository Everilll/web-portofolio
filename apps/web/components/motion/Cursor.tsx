'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useMounted } from '@/hooks/use-mounted';

export function Cursor() {
  const isReduced = useReducedMotion();
  const mounted = useMounted();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    if (isReduced || !mounted) return;

    const moveCursor = (e: MouseEvent) => {
      // Center the 16px (w-4 h-4) cursor
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isReduced, mounted, cursorX, cursorY]);

  if (isReduced || !mounted) return null;

  return React.createElement(motion.div, {
    className: 'fixed left-0 top-0 w-4 h-4 rounded-full bg-[--secondary] pointer-events-none z-[9999] mix-blend-difference hidden md:block',
    style: {
      x: cursorXSpring,
      y: cursorYSpring,
    },
  });
}
