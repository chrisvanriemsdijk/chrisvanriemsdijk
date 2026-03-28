# Chris van Riemsdijk — Personal Portfolio

Personal portfolio website with an Apple/macOS-inspired design aesthetic.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — utility-first styling with CSS variables for the Apple design system
- **Framer Motion** — scroll-triggered reveals, dock navigation, photo lightbox
- **Bun** — package manager and runtime

## Quick Start

```bash
bun install
bun run dev     # http://localhost:3000
bun run build   # production build
```

## Project Structure

- `src/app/` — Next.js App Router pages and global styles
- `src/components/sections/` — Page sections (Hero, About, Projects, Photos, Contact)
- `src/components/ui/` — Reusable UI primitives (WindowCard, GlassCard, TrafficLights, ScrollReveal, PhotoLightbox)
- `src/components/nav/` — Dock-style floating navigation
- `src/lib/constants.ts` — **All site content lives here** (name, bio, projects, photo paths, social links)
- `src/lib/animations.ts` — Shared Framer Motion animation variants
- `public/photos/` — Optimized photos served by Next.js Image

## Design System

Apple-inspired: SF Pro system font stack, glassmorphism (`backdrop-filter: blur`), macOS window chrome with traffic light dots, floating dock navigation, subtle noise texture overlay. Colors pulled from apple.com (`#f5f5f7`, `#1d1d1f`, `#6e6e73`, `#0071e3`).

## Editing Content

All copy, project data, and social links are in `src/lib/constants.ts`. Update that file — no need to touch components.
