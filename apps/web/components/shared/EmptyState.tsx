'use client';

import * as React from 'react';
import Link from 'next/link';
import { FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-[--border] bg-[--surface]/50 rounded-2xl max-w-md mx-auto my-8",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-[--muted] flex items-center justify-center text-[--foreground-muted] mb-4 shadow-warm">
        <FolderOpen className="w-6 h-6" />
      </div>

      <h3 className="font-heading text-xl font-bold text-[--foreground] mb-2">
        {title}
      </h3>

      <p className="text-sm text-[--foreground-muted] mb-6">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold bg-[--primary] text-[--primary-fg] shadow-primary hover:scale-[1.03] transition-all duration-200"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
