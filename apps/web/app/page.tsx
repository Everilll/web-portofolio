import * as React from 'react';
import { Hero } from '@/components/home/Hero';
import { TechMarquee } from '@/components/home/TechMarquee';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { FeaturedAchievements } from '@/components/home/FeaturedAchievements';
import { getProjects } from '@/lib/api/projects';
import { getTechStacks } from '@/lib/api/tech-stacks';
import { getAchievements } from '@/lib/api/achievements';

export const revalidate = 3600; // Revalidate page hourly

export default async function Home() {
  // Fetch public resources concurrently on the server
  const [projectsRes, techStacks, achievementsRes] = await Promise.all([
    getProjects({ featured: true, limit: 5 }).catch(() => ({ data: [], meta: { total: 0, page: 1, limit: 5, totalPages: 1 } })),
    getTechStacks().catch(() => []),
    getAchievements({ featured: true, limit: 4 }).catch(() => ({ data: [], meta: { total: 0, page: 1, limit: 4, totalPages: 1 } })),
  ]);

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TechMarquee techStacks={techStacks} />
      <FeaturedProjects projects={projectsRes.data} />
      <FeaturedAchievements achievements={achievementsRes.data} />
    </div>
  );
}
