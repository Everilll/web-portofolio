'use client';

import * as React from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  direction = 'left',
  speed = 25,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return React.createElement(
      'div',
      { className: cn('flex flex-wrap gap-6 justify-center', className) },
      children
    );
  }

  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return React.createElement(
    'div',
    {
      className: cn(
        'overflow-hidden flex w-full relative group',
        className
      ),
      style: {
        maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
      },
      role: 'region',
      'aria-label': 'Marquee ticker',
    },
    React.createElement(
      'div',
      {
        className: cn(
          'flex whitespace-nowrap min-w-max',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          animationClass
        ),
        style: { '--speed': `${speed}s` } as React.CSSProperties,
      },
      // First copy
      React.createElement('div', { className: 'flex gap-6 pr-6' }, children),
      // Second copy
      React.createElement('div', { className: 'flex gap-6 pr-6', 'aria-hidden': true }, children)
    )
  );
}
