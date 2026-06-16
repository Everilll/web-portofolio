'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2" role="navigation" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="w-10 h-10 rounded-full border border-[--border] bg-[--surface] hover:bg-[--muted] text-[--foreground] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[--ring]"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <div
          className="w-10 h-10 rounded-full border border-[--border] bg-[--muted]/40 text-[--foreground-muted] flex items-center justify-center cursor-not-allowed opacity-50"
          aria-disabled="true"
        >
          <ChevronLeft className="w-4 h-4" />
        </div>
      )}

      {getPageNumbers().map((page) => {
        const isCurrent = page === currentPage;
        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={cn(
              "w-10 h-10 rounded-full border text-sm font-semibold flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[--ring]",
              isCurrent
                ? "bg-[--primary] border-[--primary] text-[--primary-fg] shadow-primary"
                : "border-[--border] bg-[--surface] hover:bg-[--muted] text-[--foreground]"
            )}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="w-10 h-10 rounded-full border border-[--border] bg-[--surface] hover:bg-[--muted] text-[--foreground] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[--ring]"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div
          className="w-10 h-10 rounded-full border border-[--border] bg-[--muted]/40 text-[--foreground-muted] flex items-center justify-center cursor-not-allowed opacity-50"
          aria-disabled="true"
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </nav>
  );
}
