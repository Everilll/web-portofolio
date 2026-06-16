'use client';

import * as React from 'react';
import { MotionConfig } from 'framer-motion';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return React.createElement(
    MotionConfig,
    {
      transition: { ease: [0.22, 1, 0.36, 1], duration: 0.4 }
    },
    children
  );
}
