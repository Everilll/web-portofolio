import * as React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/api/projects';
import { DocsGallery } from '@/components/projects/DocsGallery';
import { ArrowLeft, Github, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';
import { ViewTransition } from 'react';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProjectBySlug(slug);
    return {
      title: `${project.title} | Everil Case Study`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.thumbnailUrl ? [{ url: project.thumbnailUrl }] : [],
      },
    };
  } catch {
    return {
      title: 'Project Case Study | Everil Portfolio',
    };
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  
  const project = await getProjectBySlug(slug).catch(() => {
    return null;
  });

  if (!project) {
    notFound();
  }

  // Format completed date
  const completedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="w-full py-12 md:py-20 bg-[--background] transition-colors duration-200">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col gap-12">
        
        {/* Navigation & Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[--foreground-muted] hover:text-[--primary] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to catalogue
          </Link>
        </div>

        {/* Hero Header Area */}
        <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-12 border-b border-[--border]">
          <div className="flex flex-col gap-4 max-w-3xl">
            <FadeIn delay={0.05} y={12} className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[--foreground-muted] font-medium">
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                {completedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono uppercase text-[--secondary] font-semibold">
                <Code2 className="w-3.5 h-3.5" />
                {project.status.toLowerCase()}
              </span>
            </FadeIn>
            
            <FadeIn delay={0.1} y={16}>
              <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-[--foreground]">
                {project.title}
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.15} y={20}>
              <p className="text-lg md:text-xl text-[--foreground-muted] font-sans leading-relaxed">
                {project.description}
              </p>
            </FadeIn>

            {project.techStacks && project.techStacks.length > 0 && (
              <FadeIn delay={0.2} y={12} className="flex flex-wrap gap-2 pt-2">
                {project.techStacks.map((pt) => (
                  <span
                    key={pt.techStackId}
                    className="bg-[--secondary]/10 text-[--secondary] dark:bg-[--secondary]/20 dark:text-[--foreground] border border-[--secondary]/20 rounded-full text-xs px-3 py-1 font-medium"
                  >
                    {pt.techStack.name}
                  </span>
                ))}
              </FadeIn>
            )}
          </div>

          {/* Action CTAs */}
          <FadeIn delay={0.25} y={16} className="flex flex-row lg:flex-col sm:items-center lg:items-stretch gap-3 self-start w-full sm:w-auto min-w-[200px]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-[--primary] text-[--primary-fg] shadow-primary hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex-1 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Live Showcase
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-[--surface] text-[--foreground] border border-[--border] hover:bg-[--muted] hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex-1 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
          </FadeIn>
        </header>

        {/* Large Featured Image */}
        {project.thumbnailUrl && (
          <FadeIn delay={0.3} y={30} className="w-full">
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[--border] shadow-warm">
              <ViewTransition name={`photo-${project.id}`}>
                <Image
                  src={project.thumbnailUrl}
                  alt={`${project.title} case study banner`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </ViewTransition>
            </div>
          </FadeIn>
        )}

        {/* Case Study Content */}
        <section className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12 pt-4">
          <FadeIn delay={0.35} y={20} className="flex flex-col gap-6 max-w-3xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[--foreground] mb-2">
              Case Study & Details
            </h2>
            <div className="whitespace-pre-wrap font-sans text-base md:text-lg text-[--foreground] leading-relaxed flex flex-col gap-6">
              {project.longDesc || project.description}
            </div>
          </FadeIn>

          {/* Project Details Sidebar */}
          <FadeIn delay={0.4} y={20} className="flex flex-col gap-6 bg-[--surface]/40 border border-[--border] rounded-2xl p-6 h-fit">
            <h3 className="font-heading text-xl font-bold text-[--foreground]">
              Meta Info
            </h3>
            
            <dl className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-1 border-b border-[--border] pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wider text-[--foreground-muted]">
                  Project Status
                </dt>
                <dd className="font-semibold text-[--foreground] capitalize">
                  {project.status.toLowerCase()}
                </dd>
              </div>

              <div className="flex flex-col gap-1 border-b border-[--border] pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wider text-[--foreground-muted]">
                  Timeline
                </dt>
                <dd className="font-semibold text-[--foreground]">
                  {completedDate}
                </dd>
              </div>

              {project.techStacks && project.techStacks.length > 0 && (
                <div className="flex flex-col gap-1">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[--foreground-muted] mb-1">
                    Primary Stack
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.techStacks.slice(0, 5).map((pt) => (
                      <span
                        key={pt.techStackId}
                        className="bg-[--muted] text-[--foreground-muted] border border-[--border] rounded-md text-[11px] px-2 py-0.5 font-mono"
                      >
                        {pt.techStack.name}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </FadeIn>
        </section>

        {/* Gallery Section */}
        {project.docs && project.docs.length > 0 && (
          <FadeIn delay={0.45} y={24} className="border-t border-[--border] pt-12 mt-6">
            <DocsGallery docs={project.docs} />
          </FadeIn>
        )}

      </div>
    </article>
  );
}
