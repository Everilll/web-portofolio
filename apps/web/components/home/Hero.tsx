'use client';

import * as React from 'react';
import Link from 'next/link';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { FadeIn } from '@/components/motion/FadeIn';

export function Hero() {
  return (
    <section className="relative w-full py-24 md:py-32 flex flex-col justify-center overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 w-full relative z-10 flex flex-col items-start gap-8">
        
        <FadeIn delay={0.1}>
          <span className="text-xs font-bold tracking-wider text-[--secondary] uppercase bg-[--secondary]/10 px-3 py-1 rounded-full border border-[--secondary]/20">
            Creative Developer & Digital Crafter
          </span>
        </FadeIn>

        <AnimatedText
          text="I build digital experiences that blend precision with play."
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[--foreground] max-w-4xl leading-[0.95]"
          el="h1"
          delay={0.2}
        />

        <FadeIn delay={0.6} className="max-w-2xl">
          <p className="text-lg md:text-xl text-[--foreground-muted] leading-relaxed">
            Hey there, I'm <strong className="text-[--foreground]">Everil</strong>. I spend my time designing and programming interfaces that feel organic and alive. Fusing clean NestJS backends with rich, animated React frontends, I design with heart and craft with code.
          </p>
        </FadeIn>

        <FadeIn delay={0.8} className="flex flex-wrap items-center gap-4 mt-4">
          <MagneticButton>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[--primary] px-8 text-sm font-semibold text-[--primary-fg] transition-colors shadow-primary outline-none focus-visible:ring-2 focus-visible:ring-[--ring] hover:opacity-90"
            >
              See my work
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[--surface] border border-[--border] px-8 text-sm font-semibold text-[--foreground] transition-colors shadow-warm outline-none focus-visible:ring-2 focus-visible:ring-[--ring] hover:bg-[--muted]"
            >
              Get in touch
            </Link>
          </MagneticButton>
        </FadeIn>

      </div>

      <div className="absolute right-[-10%] top-[10%] w-[35rem] h-[35rem] rounded-full bg-[--primary]/5 blur-[80px] pointer-events-none -z-10" />
      <div className="absolute left-[-10%] bottom-[10%] w-[30rem] h-[30rem] rounded-full bg-[--accent]/5 blur-[70px] pointer-events-none -z-10" />
    </section>
  );
}
