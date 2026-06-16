import * as React from 'react';
import { Metadata } from 'next';
import { getProjects } from '@/lib/api/projects';
import { ProjectStatus } from '@/lib/types';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Pagination } from '@/components/shared/Pagination';
import { FadeIn } from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Projects | Everil Portfolio',
  description: 'Explore my engineering and design projects. Case studies covering full-stack web systems, mobile interfaces, and developer tooling.',
};

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page, 10) : 1;
  const limit = 6;

  // Fetch only published projects for the public page
  const projectsRes = await getProjects({
    status: ProjectStatus.PUBLISHED,
    page: currentPage,
    limit,
  }).catch(() => ({
    data: [],
    meta: { total: 0, page: 1, limit, totalPages: 1 },
  }));

  const hasProjects = projectsRes.data && projectsRes.data.length > 0;

  return (
    <div className="w-full py-16 md:py-24 bg-[--background] transition-colors duration-200">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Header Section */}
        <header className="max-w-2xl flex flex-col gap-4">
          <FadeIn delay={0.1} y={16}>
            <span className="text-xs font-bold tracking-wider text-[--primary] uppercase">
              Digital Catalogue
            </span>
          </FadeIn>
          <FadeIn delay={0.2} y={20}>
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-[--foreground]">
              Selected Works<span className="text-[--primary]">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} y={24}>
            <p className="text-lg md:text-xl text-[--foreground-muted] font-sans leading-relaxed">
              A comprehensive showcase of things I've built, written, and deployed. From web systems to creative interactive experiments.
            </p>
          </FadeIn>
        </header>

        {/* Content Section */}
        {hasProjects ? (
          <div className="flex flex-col gap-20">
            {/* Staggered asymmetric card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-16 lg:pb-16">
              {projectsRes.data.map((project, index) => {
                // Apply visual staggering on desktop viewports
                // Column 2 gets translate-y-6 on medium screen and up
                // Column 3 gets translate-y-12 on large screens
                let staggerClass = "";
                if (index % 2 === 1) {
                  staggerClass = "md:translate-y-6 lg:translate-y-0";
                }
                if (index % 3 === 1) {
                  staggerClass = "lg:translate-y-6";
                } else if (index % 3 === 2) {
                  staggerClass = "lg:translate-y-12";
                }

                return (
                  <FadeIn
                    key={project.id}
                    delay={0.1 * (index % 3)}
                    y={30}
                    className={staggerClass}
                  >
                    <ProjectCard project={project} />
                  </FadeIn>
                );
              })}
            </div>

            {/* Pagination controls */}
            {projectsRes.meta.totalPages > 1 && (
              <FadeIn delay={0.1} y={12} className="flex justify-center border-t border-[--border] pt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={projectsRes.meta.totalPages}
                />
              </FadeIn>
            )}
          </div>
        ) : (
          <FadeIn delay={0.2} y={20}>
            <EmptyState
              title="No Projects Available"
              description="It looks like there aren't any published projects right now. Please check back later!"
              actionLabel="Return Home"
              actionHref="/"
            />
          </FadeIn>
        )}
      </div>
    </div>
  );
}
