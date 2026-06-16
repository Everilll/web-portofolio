'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMounted } from '@/hooks/use-mounted';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return React.createElement('div', { className: 'w-10 h-10' });
  }

  const isDark = theme === 'dark';

  return React.createElement(
    'button',
    {
      onClick: () => setTheme(isDark ? 'light' : 'dark'),
      className: 'relative w-10 h-10 flex items-center justify-center rounded-full bg-[--surface] hover:bg-[--muted] border border-[--border] text-[--foreground] cursor-pointer transition-colors shadow-warm outline-none focus-visible:ring-2 focus-visible:ring-[--ring]',
      'aria-label': 'Toggle theme',
    },
    React.createElement(
      AnimatePresence,
      { mode: 'wait', initial: false },
      isDark
        ? React.createElement(
            motion.div,
            {
              key: 'moon',
              initial: { opacity: 0, rotate: -90, scale: 0.8 },
              animate: { opacity: 1, rotate: 0, scale: 1 },
              exit: { opacity: 0, rotate: 90, scale: 0.8 },
              transition: { duration: 0.2 },
            },
            React.createElement(Moon, { className: 'w-5 h-5' })
          )
        : React.createElement(
            motion.div,
            {
              key: 'sun',
              initial: { opacity: 0, rotate: 90, scale: 0.8 },
              animate: { opacity: 1, rotate: 0, scale: 1 },
              exit: { opacity: 0, rotate: -90, scale: 0.8 },
              transition: { duration: 0.2 },
            },
            React.createElement(Sun, { className: 'w-5 h-5' })
          )
    )
  );
}
