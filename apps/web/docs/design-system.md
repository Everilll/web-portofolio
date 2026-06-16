# Design System — Portfolio

> **Anchor designer**: [Josh Comeau](https://www.joshwcomeau.com/) — warm, playful, opinionated, motion-rich.  
> **Thematic inspiration**: Nasa Yuzaki (sky, stars) fused with Josh Comeau's warm base so the result doesn't feel like a generic blue portfolio.

---

## 1. Philosophy & Do / Don't

### ✅ Do
- Use OKLCH throughout — perceptually uniform, easier to reason about chroma/lightness.
- Write copy with a clear author voice; personal, sometimes cheeky, never corporate.
- Treat animation as _core UX_, not decoration. Every motion should carry meaning (feedback, transition, delight).
- Honour `prefers-reduced-motion` on every animated component — fall back to instant renders.
- Display type at large scale (`6xl`–`8xl`) with `tracking-tighter` for cinematic presence.
- Use varied section backgrounds (cream → muted → cream) to create visual rhythm.
- Round corners generously — `--radius: 0.9rem` — for a friendly, approachable feel.
- Use numbered lists (01, 02 …) for editorial project listings.

### ❌ Don't
- No purple-pink gradients.
- No decorative glassmorphism (blurred panels for no reason).
- No generic "Hello, I'm [Name]" hero copy.
- No three-column card grids for projects (too template-y).
- No "Built with Next.js + Tailwind" in the footer.
- Don't use Tailwind's default blue — use the custom sky-blue primary below.
- Don't animate without a static fallback.

---

## 2. Colour Palette

Implemented verbatim as CSS custom properties in `app/globals.css`. The palette uses three semantic layers: **background/surface**, **foreground**, and three **brand colours** (primary, secondary, accent).

### Light mode (`:root`)

```css
:root {
  /* backgrounds — warm cream white base */
  --background:        oklch(98.5% 0.008 85);
  --surface:           oklch(96% 0.012 85);
  --muted:             oklch(91% 0.015 85);

  /* foregrounds */
  --foreground:        oklch(20% 0.04 250);
  --foreground-muted:  oklch(45% 0.04 250);

  /* primary — vibrant hot pink */
  --primary:           oklch(60% 0.22 340);
  --primary-light:     oklch(75% 0.15 340);
  --primary-fg:        oklch(98.5% 0.008 85);

  /* secondary — rich purple/indigo */
  --secondary:         oklch(50% 0.20 290);
  --secondary-fg:      oklch(98.5% 0.008 85);

  /* accent — vivid teal/turquoise */
  --accent:            oklch(62% 0.16 200);
  --accent-fg:         oklch(98.5% 0.008 85);

  /* ui */
  --border:            oklch(85% 0.015 85);
  --input:             oklch(94% 0.012 85);
  --ring:              oklch(60% 0.22 340);

  --radius:            0.9rem;
}
```

### Token reference (light)

| Token | Value | Role |
|---|---|---|
| `--background` | `oklch(98.5% 0.008 85)` | Warm cream white canvas |
| `--surface` | `oklch(96% 0.012 85)` | Toasted surface (cards) |
| `--muted` | `oklch(91% 0.015 85)` | Muted section background |
| `--foreground` | `oklch(20% 0.04 250)` | Near-black with a cool tint |
| `--foreground-muted` | `oklch(45% 0.04 250)` | Secondary text |
| `--primary` | `oklch(60% 0.22 340)` | Vibrant hot pink — primary CTA, links |
| `--primary-light` | `oklch(75% 0.15 340)` | Hover/tint of primary |
| `--primary-fg` | `oklch(98.5% 0.008 85)` | Text on primary |
| `--secondary` | `oklch(50% 0.20 290)` | Rich purple/indigo — highlights, tags |
| `--secondary-fg` | `oklch(98.5% 0.008 85)` | Text on secondary |
| `--accent` | `oklch(62% 0.16 200)` | Vivid teal/turquoise — decorative accent |
| `--accent-fg` | `oklch(98.5% 0.008 85)` | Text on accent |
| `--border` | `oklch(85% 0.015 85)` | Subtle warm border |
| `--input` | `oklch(94% 0.012 85)` | Input background |
| `--ring` | `oklch(60% 0.22 340)` | Focus ring (matches primary) |
| `--radius` | `0.9rem` | Global corner radius |

### Dark mode (`.dark`)

```css
.dark {
  /* backgrounds — deep dark navy sky */
  --background:        oklch(12% 0.025 245);
  --surface:           oklch(16% 0.03 245);
  --muted:             oklch(22% 0.04 245);

  /* foregrounds */
  --foreground:        oklch(95% 0.015 240);
  --foreground-muted:  oklch(70% 0.02 240);

  /* primary — brighter hot pink */
  --primary:           oklch(68% 0.23 340);
  --primary-light:     oklch(32% 0.15 340);
  --primary-fg:        oklch(12% 0.025 245);

  /* secondary — starlight purple/indigo */
  --secondary:         oklch(70% 0.18 290);
  --secondary-fg:      oklch(12% 0.025 245);

  /* accent — vivid teal */
  --accent:            oklch(75% 0.15 200);
  --accent-fg:         oklch(12% 0.025 245);

  /* ui */
  --border:            oklch(26% 0.05 245);
  --input:             oklch(18% 0.035 245);
  --ring:              oklch(68% 0.23 340);
}
```

### Token reference (dark)

| Token | Value | Role |
|---|---|---|
| `--background` | `oklch(12% 0.025 245)` | Deep dark navy sky |
| `--surface` | `oklch(16% 0.03 245)` | Navy card surface |
| `--muted` | `oklch(22% 0.04 245)` | Navy section background |
| `--foreground` | `oklch(95% 0.015 240)` | Near-white starlight |
| `--foreground-muted` | `oklch(70% 0.02 240)` | Muted text |
| `--primary` | `oklch(68% 0.23 340)` | Brighter hot pink |
| `--primary-light` | `oklch(32% 0.15 340)` | Dark tint of primary |
| `--primary-fg` | `oklch(12% 0.025 245)` | Text on primary |
| `--secondary` | `oklch(70% 0.18 290)` | Starlight purple/indigo |
| `--secondary-fg` | `oklch(12% 0.025 245)` | Text on secondary |
| `--accent` | `oklch(75% 0.15 200)` | Vivid teal/turquoise |
| `--accent-fg` | `oklch(12% 0.025 245)` | Text on accent |
| `--border` | `oklch(26% 0.05 245)` | Muted navy border |
| `--input` | `oklch(18% 0.035 245)` | Input background |
| `--ring` | `oklch(68% 0.23 340)` | Focus ring |

> **Note on shadcn compatibility**: shadcn reads `--card`, `--popover`, `--card-foreground`, `--popover-foreground` etc. Map those to the tokens above in `globals.css` (e.g. `--card: var(--surface)`). Never use shadcn's default blue — the custom hot pink primary above replaces it entirely.

---

## 3. Typography

### Font Stack

| Role | Font | Variable | Fallback |
|---|---|---|---|
| **Heading / Display** | `Fraunces` (serif, optical size, italic axis) | `--font-heading` | Georgia, serif |
| **Body** | `Inter` | `--font-sans` | system-ui, sans-serif |
| **Monospace / Code** | `Geist Mono` | `--font-mono` | Courier New, monospace |

### Loading (Next.js `next/font/google`)

```ts
// app/layout.tsx
import { Fraunces, Inter } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// Apply all three variables to <html>:
// className={cn(fraunces.variable, inter.variable, geistMono.variable)}
```

### Scale

| Class | Usage |
|---|---|
| `text-8xl` + `tracking-tighter` + `font-heading` | Hero headline — cinematic |
| `text-6xl` + `tracking-tight` + `font-heading` | Section title |
| `text-4xl` + `font-heading` | Sub-section heading |
| `text-2xl` | Card / callout title |
| `text-base` / `text-lg` | Body prose (`font-sans`) |
| `text-sm` | Meta / captions |

All display headings use `font-heading` (Fraunces). Body stays `font-sans` (Inter).

---

## 4. Motion Principles

### Core Easing

```ts
// lib/motion.ts
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const; // cubic-bezier out-expo
```

Use this easing for all entrance animations. It feels snappy without overshooting.

### Duration Budget

| Intent | Duration |
|---|---|
| Micro (hover, active) | 150–200ms |
| Transition (reveal, enter) | 300–400ms |
| Dramatic (hero text, page) | 500–600ms |

### Standard Variants

```ts
// lib/motion.ts — reusable Motion for React variants

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const revealMask = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
};
```

### Motion Rules

- All `components/motion/*` primitives accept a `reduced` prop from `useReducedMotion()`.
- If `reduced === true`, render children with zero duration / no transform.
- Never animate layout-affecting properties (width, height) without the `layout` prop in Motion.
- Marquee must not cause CLS — pre-set container height, use `overflow: hidden`.
- `whileInView` triggers use `once: true` + `margin: '-10% 0px'` viewport root margin.
- All `transition` objects must include `ease: EASE_OUT_EXPO` — never use the Motion default linear.

### Tech Marquee — motion spec

```
Two rows, infinite loop, opposite directions:
  Row 1: duplicate items, animate x: [0, -50%], loop, pause on hover → direction LEFT
  Row 2: duplicate items, animate x: [-50%, 0], loop, pause on hover → direction RIGHT

prefers-reduced-motion: render as static flex-wrap grid instead.
Item on hover: scale(1.08) + show tooltip with category name.
Container: overflow-hidden, height pre-set to avoid CLS.
```

---

## 5. Spacing & Layout

- **Max content width**: `1280px` (`max-w-screen-xl`)
- **Section vertical padding**: `py-24` (large), `py-16` (medium), `py-12` (small)
- **Grid**: prefer CSS Grid with named areas over complex Flex nesting
- **Asymmetric layouts**: projects use 2-column asymmetric (e.g., `grid-cols-[3fr_2fr]`) rather than 3-equal-column grids
- **Section rhythm**: alternate background `--background` → `--muted` → `--background` between sections

---

## 6. Shadows & Texture

Josh Comeau signature: **grain/noise overlay** for warmth, plus **coloured box-shadows** instead of grey ones.

```css
/* Grain overlay — subtle warmth, signature Josh Comeau */
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/noise.png'); /* fine-grained SVG/PNG noise */
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}

/* Coloured shadows — use instead of default Tailwind shadow-* */
.shadow-warm {
  box-shadow: 0 4px 24px -4px oklch(66% 0.150 82 / 0.18);
}
.shadow-primary {
  box-shadow: 0 4px 24px -4px oklch(52% 0.180 250 / 0.22);
}
```

---

## 7. Component Aesthetic Notes

### Buttons
- **Primary**: `bg-[--primary] text-[--primary-fg]`, hover: `scale(1.04)` + `shadow-primary`
- **Ghost**: transparent, hover: `bg-[--muted]`
- **Magnetic CTA**: wraps `MagneticButton` from `components/motion/`
- Rounded: `rounded-full` for hero CTAs, `rounded-lg` for form controls

### Cards
- `bg-[--surface] border border-[--border]`, `rounded-xl`
- On hover: subtle `translateY(-4px)` + `shadow-warm` (200ms transition)

### Badges / Tags
- Tech stack chips: `bg-[--secondary]/20 text-[--secondary-fg] border border-[--secondary]/30`
- Status badges: use destructive / success / warning semantic colours
- Rounded-full, `text-xs`, `px-3 py-1`

### Navbar
- Sticky, `backdrop-blur-sm bg-[--background]/80` on scroll
- Shrinks slightly on scroll (padding transition 200ms)
- Logo on left, nav links + theme toggle on right

### Toast (Sonner)
- Background: `var(--surface)`, border: `var(--border)`, `shadow-warm`
- Small, bottom-right, disappears after 3s
- Icon: lucide icon matching the type (CheckCircle2, AlertCircle, etc.)

### Footer
- Personal sign-off copy, not "Built with…"
- "Last updated: [date]" generated at build time
- Social links: GitHub, LinkedIn — icon only with `aria-label`

---

## 8. Accessibility

- Minimum contrast ratio: **AA** in both light and dark mode (verify with APCA or WCAG 2.1)
- All interactive elements have visible `:focus-visible` ring using `--ring`
- `aria-label` on icon-only buttons (theme toggle, close, etc.)
- `role="region"` + `aria-label="Tech stack ticker"` on the marquee; set `animation-play-state: paused` on `prefers-reduced-motion`
- Heading hierarchy: single `<h1>` per page, logical nesting thereafter
- Form inputs: always have associated `<label>`, not just placeholder

---

## 9. File Map

```
apps/web/
├── docs/
│   └── design-system.md          ← this file (single source of truth)
├── app/
│   └── globals.css                ← CSS custom properties (palette verbatim from §2)
│                                     + @theme inline mappings
│                                     + utility classes (.shadow-warm, .grain, etc.)
├── lib/
│   ├── motion.ts                  ← EASE_OUT_EXPO, fadeUp, stagger, revealMask, scaleIn
│   └── utils.ts                   ← cn() helper (already exists)
├── hooks/
│   ├── use-reduced-motion.ts      ← prefers-reduced-motion hook
│   ├── use-mounted.ts             ← SSR-safe mounted flag
│   └── use-auth.ts                ← client-side auth status
└── components/
    ├── motion/
    │   ├── FadeIn.tsx             ← scroll-triggered fade + slide up
    │   ├── Reveal.tsx             ← mask reveal (revealMask variant)
    │   ├── AnimatedText.tsx       ← per-word heading reveal
    │   ├── Marquee.tsx            ← infinite horizontal scroller
    │   ├── MagneticButton.tsx     ← cursor-following CTA wrapper
    │   └── Cursor.tsx             ← (optional) custom cursor for desktop
    ├── layout/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── ThemeToggle.tsx        ← sun↔moon animated
    │   └── MotionProvider.tsx     ← lazy-loads motion features
    ├── home/
    │   ├── Hero.tsx
    │   ├── TechMarquee.tsx        ← two-row opposite-direction marquee
    │   ├── FeaturedProjects.tsx   ← numbered editorial list
    │   └── FeaturedAchievements.tsx
    └── shared/
        ├── ProjectCard.tsx
        ├── AchievementCard.tsx
        ├── EmptyState.tsx
        └── Pagination.tsx
```

---

*Last updated: 2026-06-16 — Day 0 of implementation plan.*
