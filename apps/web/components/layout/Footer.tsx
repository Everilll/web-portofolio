'use client';

import * as React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[--border] bg-[--surface] py-12 text-sm text-[--foreground-muted]">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="font-semibold text-[--foreground]">
            Handcrafted with love and starlight.
          </p>
          <p>
            &copy; {currentYear} Everil. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Everilll"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--foreground-muted] hover:text-[--foreground] transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--foreground-muted] hover:text-[--foreground] transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:averildwiy@gmail.com"
            className="text-[--foreground-muted] hover:text-[--foreground] transition-colors"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
