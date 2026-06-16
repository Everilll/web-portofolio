'use client';

import * as React from 'react';
import Image from 'next/image';
import { ProjectDoc } from '@/lib/types';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface DocsGalleryProps {
  docs?: ProjectDoc[];
}

export function DocsGallery({ docs = [] }: DocsGalleryProps) {
  const isReduced = useReducedMotion();
  const [activeImageIndex, setActiveImageIndex] = React.useState<number | null>(null);

  // Filter only images for this lightbox gallery
  const images = React.useMemo(() => {
    return docs
      .filter((doc) => doc.type === 'IMAGE' || doc.type.toLowerCase() === 'image')
      .sort((a, b) => a.order - b.order);
  }, [docs]);

  // Handle keyboard events when modal is open
  React.useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, images]);

  if (images.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setActiveImageIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => {
      if (prev === null) return null;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const currentImage = activeImageIndex !== null ? images[activeImageIndex] : null;

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-2xl font-bold tracking-tight text-[--foreground]">
          Project Gallery
        </h3>
        <p className="text-sm text-[--foreground-muted]">
          Screenshots, architecture diagrams, and design assets. Click on any item to view in full resolution.
        </p>
      </div>

      {/* Grid of thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((doc, index) => (
          <button
            key={doc.id}
            onClick={() => setActiveImageIndex(index)}
            className="group relative aspect-video w-full rounded-xl overflow-hidden border border-[--border] bg-[--surface] cursor-pointer shadow-warm hover:shadow-primary transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:outline-none"
            aria-label={`View full size image: ${doc.title || `Project image ${index + 1}`}`}
          >
            <Image
              src={doc.url}
              alt={doc.title || `Project documentation thumbnail ${index + 1}`}
              fill
              sizes="(max-w-640px) 50vw, (max-w-1024px) 33vw, 250px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <Maximize2 className="w-5 h-5 text-white scale-90 group-hover:scale-100 transition-transform duration-300" />
            </div>
            {doc.title && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-left pointer-events-none">
                <span className="text-[10px] md:text-xs font-semibold text-white truncate block">
                  {doc.title}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReduced ? 0 : 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            {/* Top Bar controls */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white z-[110]">
              <span className="text-xs md:text-sm font-semibold tracking-wider font-mono opacity-80">
                {activeImageIndex + 1} / {images.length}
              </span>
              <button
                onClick={() => setActiveImageIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:outline-none"
                aria-label="Close image viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left navigation arrow */}
            {images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer z-[110] focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Active Image container */}
            <div className="relative w-full max-w-5xl aspect-video md:aspect-[16/10] overflow-hidden flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: isReduced ? 1 : 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: isReduced ? 1 : 0.95 }}
                  transition={{ duration: isReduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentImage.url}
                    alt={currentImage.title || `Project image ${activeImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right navigation arrow */}
            {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer z-[110] focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Bottom Caption bar */}
            {currentImage.title && (
              <div className="absolute bottom-6 inset-x-8 text-center text-white/90 max-w-xl mx-auto z-[110]">
                <h4 className="font-heading text-lg md:text-xl font-bold tracking-tight">
                  {currentImage.title}
                </h4>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
