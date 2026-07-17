# Chris van Riemsdijk — Personal Portfolio

Personal portfolio website with a bold editorial design: massive display typography on warm bone paper, dark panels, and a circular portrait anchored to the hero title.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, static export)
- **Tailwind CSS v4** — utility-first styling with CSS variables for the design tokens
- **Framer Motion** — scroll-triggered reveals, scroll-driven word-fill statement, command palette
- **Bun** — package manager and runtime

## Quick Start

```bash
bun install
bun run dev     # http://localhost:3000
bun run build   # production build
```

## Project Structure

- `src/app/` — Next.js App Router pages and global styles
- `src/components/sections/` — Page sections (HeroIntro, Statement, Impact, Services, Principles, Journey, Talks, Footer)
- `src/components/ui/` — Reusable UI primitives (ScrollReveal)
- `src/components/nav/` — Bottom command palette navigation (CommandPalette, ⌘K)
- `src/lib/constants.ts` — **All site content lives here** (bio, stats, services, principles, experience, talks, photo paths, social links)
- `src/lib/animations.ts` — Shared Framer Motion animation variants
- `public/photos/` — Optimized photos served by Next.js Image

## Design System

Editorial and typographic: Archivo (variable width axis) set expanded/heavy/uppercase for display type via the `.display` class, IBM Plex Mono for `/labels`, stats and dates via `.mono-label`. Warm bone paper background (`--paper: #f1efe9`), near-black ink (`--ink: #131210`), dark panels (`--panel: #17150f`), one cold accent (`--north: #2b45e0`) used sparingly (selection, focus). Hairline-divider rows for services/talks/experience, dark footer with giant "Chris" watermark, noise texture overlay, scroll-driven word-fill statement (pinned two-screen section). Reduced motion is respected via a global CSS override.

## Editing Content

All copy, project data, and social links are in `src/lib/constants.ts`. Update that file — no need to touch components.
