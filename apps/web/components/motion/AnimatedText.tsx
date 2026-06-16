'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  delay?: number;
}

export function AnimatedText({
  text,
  className,
  el: Element = 'h1',
  delay = 0,
}: AnimatedTextProps) {
  const isReduced = useReducedMotion();
  const words = text.split(' ');

  if (isReduced) {
    return React.createElement(Element, { className }, text);
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const spans = words.map((word, i) =>
    React.createElement(
      'span',
      {
        key: i,
        className: 'inline-block mr-[0.25em] whitespace-nowrap',
      },
      React.createElement(
        motion.span,
        {
          className: 'inline-block',
          variants: wordVariants,
        },
        word
      )
    )
  );

  return React.createElement(
    motion[Element as 'h1'] as any,
    {
      className,
      variants: containerVariants,
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin: '-10% 0px' },
    },
    spans
  );
}
