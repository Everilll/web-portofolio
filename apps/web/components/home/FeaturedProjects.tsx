'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { ViewTransition } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-24 max-w-screen-xl mx-auto px-6 flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-[--primary] uppercase">Featured Work</span>
        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-[--foreground]">
          Case Studies & Projects
        </h2>
      </div>

      <div className="flex flex-col border-t border-[--border]">
        {projects.map((project, index) => {
          const numberStr = String(index + 1).padStart(2, '0');
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={project.id}
              className="relative border-b border-[--border] group py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-start gap-6 relative z-10">
                <span className="font-mono text-sm font-semibold text-[--foreground-muted] mt-1.5">
                  {numberStr}
                </span>

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[--foreground] hover:text-[--primary] transition-colors"
                  >
                    {project.title}
                  </Link>

                  <p className="text-base text-[--foreground-muted] max-w-xl">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 relative z-10 self-start md:self-center">
                <Link
                  href={`/projects/${project.slug}`}
                  className="w-12 h-12 rounded-full border border-[--border] group-hover:border-[--primary] group-hover:bg-[--primary] group-hover:text-[--primary-fg] flex items-center justify-center transition-all duration-300"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <AnimatePresence>
                {isHovered && project.thumbnailUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: '-50%' }}
                    animate={{ opacity: 1, scale: 1, y: '-50%' }}
                    exit={{ opacity: 0, scale: 0.9, y: '-50%' }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden lg:block absolute right-[15%] top-1/2 w-80 h-48 rounded-xl overflow-hidden border border-[--border] shadow-warm pointer-events-none z-20"
                  >
                    <ViewTransition name={`photo-${project.id}`}>
                      <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                    </ViewTransition>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-start mt-4">
        <Link
          href="/projects"
          className="text-sm font-semibold tracking-wider text-[--primary] hover:text-[--primary-light] flex items-center gap-1.5 transition-colors uppercase group/all"
        >
          View all case studies
          <span className="transition-transform group-hover/all:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
