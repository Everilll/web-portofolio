'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { ViewTransition } from 'react';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={
        "bg-[--surface] border border-[--border] rounded-xl overflow-hidden shadow-warm transition-all duration-300 hover:-translate-y-1 hover:shadow-primary flex flex-col h-full group " +
        (className || '')
      }
    >
      {/* Thumbnail area */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[--primary]/10 to-[--secondary]/10 border-b border-[--border]">
        {project.thumbnailUrl ? (
          <ViewTransition name={`photo-${project.id}`}>
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-w-768px) 100vw, 380px"
              priority={project.featured}
            />
          </ViewTransition>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[--primary]/20 via-[--secondary]/10 to-[--accent]/20">
            <span className="font-heading text-lg font-bold text-[--foreground-muted] tracking-wide">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-col p-6 flex-grow">
        <h3 className="font-heading text-2xl font-bold tracking-tight text-[--foreground] mb-2 group-hover:text-[--primary] transition-colors">
          <Link href={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>

        <p className="text-sm text-[--foreground-muted] line-clamp-3 mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech stack chips */}
        {project.techStacks && project.techStacks.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStacks.slice(0, 4).map((pt) => (
              <span
                key={pt.techStackId}
                className="bg-[--secondary]/10 text-[--secondary] dark:bg-[--secondary]/20 dark:text-[--foreground] border border-[--secondary]/20 rounded-full text-xs px-2.5 py-0.5 font-medium transition-colors"
              >
                {pt.techStack.name}
              </span>
            ))}
            {project.techStacks.length > 4 && (
              <span className="bg-[--muted] text-[--foreground-muted] border border-[--border] rounded-full text-xs px-2.5 py-0.5 font-medium">
                +{project.techStacks.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between border-t border-[--border] pt-4 mt-auto">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-bold text-[--primary] hover:text-[--primary-light] flex items-center gap-1 transition-colors group/link"
          >
            Read Case Study
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>

          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-[--muted] text-[--foreground-muted] hover:text-[--foreground] transition-colors border border-transparent hover:border-[--border]"
                title="View Codebase"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-[--muted] text-[--foreground-muted] hover:text-[--foreground] transition-colors border border-transparent hover:border-[--border]"
                title="Live Demo"
                aria-label={`Visit live demo for ${project.title}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
