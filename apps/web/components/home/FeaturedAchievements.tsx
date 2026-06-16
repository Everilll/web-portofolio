'use client';

import * as React from 'react';
import Link from 'next/link';
import { Achievement } from '@/lib/types';
import { FadeIn } from '@/components/motion/FadeIn';
import { Award, ExternalLink } from 'lucide-react';

interface FeaturedAchievementsProps {
  achievements: Achievement[];
}

export function FeaturedAchievements({ achievements }: FeaturedAchievementsProps) {
  if (achievements.length === 0) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return '';
    }
  };

  return (
    <section className="w-full py-24 bg-[--muted]/30 border-y border-[--border]">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-wider text-[--secondary] uppercase">Milestones</span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-[--foreground]">
            Honors & Achievements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach) => (
            <FadeIn key={ach.id} delay={0.1}>
              <div className="h-full flex flex-col justify-between p-6 rounded-2xl bg-[--surface] border border-[--border] hover:border-[--primary]/30 hover:-translate-y-1 transition-all duration-300 shadow-warm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-10 h-10 rounded-full bg-[--secondary]/10 border border-[--secondary]/20 flex items-center justify-center text-[--secondary]">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-[--foreground-muted]">
                      {formatDate(ach.date)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-xl font-bold tracking-tight text-[--foreground]">
                      {ach.title}
                    </h3>
                    {ach.description && (
                      <p className="text-sm text-[--foreground-muted] leading-relaxed">
                        {ach.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-[--border]">
                  <span className="text-xs font-medium text-[--foreground-muted]">
                    Issued by <strong className="text-[--foreground]">{ach.issuer || 'Unknown'}</strong>
                  </span>

                  {ach.certificateUrl && (
                    <a
                      href={ach.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[--primary] hover:text-[--primary-light] flex items-center gap-1 transition-colors"
                    >
                      Verify
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex justify-start mt-4">
          <Link
            href="/achievements"
            className="text-sm font-semibold tracking-wider text-[--secondary] hover:text-[--secondary-light] flex items-center gap-1.5 transition-colors uppercase group/all"
          >
            See all credentials
            <span className="transition-transform group-hover/all:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
