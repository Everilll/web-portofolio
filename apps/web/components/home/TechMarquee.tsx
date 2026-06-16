'use client';

import * as React from 'react';
import Image from 'next/image';
import { Marquee } from '@/components/motion/Marquee';
import { TechStack } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

interface TechMarqueeProps {
  techStacks: TechStack[];
}

export function TechMarquee({ techStacks }: TechMarqueeProps) {
  const midPoint = Math.ceil(techStacks.length / 2);
  const row1 = techStacks.slice(0, midPoint);
  const row2 = techStacks.slice(midPoint);

  const renderTechCard = (tech: TechStack) => {
    return React.createElement(
      Tooltip,
      { key: tech.id },
      React.createElement(
        TooltipTrigger,
        { asChild: true },
        React.createElement(
          motion.div,
          {
            whileHover: { scale: 1.08, y: -2 },
            className: "flex items-center gap-3 px-5 py-3 rounded-xl bg-[--surface] border border-[--border] shadow-warm text-sm font-medium cursor-pointer transition-all hover:border-[--primary]/30"
          },
          tech.iconUrl
            ? React.createElement(Image, {
                src: tech.iconUrl,
                alt: tech.name,
                width: 20,
                height: 20,
                className: "object-contain w-5 h-5"
              })
            : React.createElement("div", { className: "w-5 h-5 rounded bg-[--muted] flex items-center justify-center text-[10px] font-bold" }, tech.name.substring(0, 2).toUpperCase()),
          React.createElement("span", { className: "text-[--foreground]" }, tech.name)
        )
      ),
      React.createElement(
        TooltipContent,
        { className: "bg-[--foreground] text-[--background] border-[--border] text-xs font-semibold px-2.5 py-1 rounded shadow-md" },
        tech.category
      )
    );
  };

  return (
    <section className="w-full py-16 bg-[--muted]/30 border-y border-[--border] flex flex-col gap-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 w-full flex flex-col gap-2 mb-4">
        <span className="text-xs font-bold tracking-wider text-[--accent] uppercase">My Toolbox</span>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[--foreground]">
          Technologies I craft with
        </h2>
      </div>

      <TooltipProvider delayDuration={150}>
        <div className="flex flex-col gap-6 w-full">
          {row1.length > 0 && (
            <Marquee direction="left" speed={28} className="py-2">
              {row1.map(renderTechCard)}
            </Marquee>
          )}

          {row2.length > 0 && (
            <Marquee direction="right" speed={32} className="py-2">
              {row2.map(renderTechCard)}
            </Marquee>
          )}
        </div>
      </TooltipProvider>
    </section>
  );
}
