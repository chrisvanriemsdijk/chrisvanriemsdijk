# Chris van Riemsdijk - Personal Portfolio

Personal portfolio for an AI expert and speaker. Photo-led and plain-spoken: the stage photography carries the page, the type and palette stay quiet around it. Sections follow what someone booking a speaker asks: hero, proof numbers, services, talks, how I work, about, FAQ, contact.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, static export)
- **Tailwind CSS v4** with design tokens as CSS variables in `src/app/globals.css`
- **Bun** as package manager and runtime

## Quick Start

```bash
bun install
bun run dev     # http://localhost:3000
bun run build   # production build to out/
```

## Project Structure

- `src/app/page.tsx` - the whole single page (header, hero, proof, services, talks, approach, about, FAQ, contact)
- `src/components/EmailActions.tsx` - client-side email buttons (address is obfuscated, see `src/lib/email.ts`)
- `src/lib/constants.ts` - **all site content lives here**; `llms.txt` is generated from it
- `public/photos/` - `stage.jpg`, `room.jpg`, `portrait.jpg` are processed crops; `headshot.jpeg` is the OG image; `face.jpg` is a square crop of it for the small hero photo

## Design System

Dark only, built around React Bits' Grainient "aurora" preset: near-black green ground, cream type, mint (`--accent`) as the one accent, film grain over the page. Geist throughout, no serif. Tokens and contrast notes in `src/app/globals.css`. The user's bar: something to show friends, colleagues and experts that blows them away.

- `src/components/bits/Grainient.tsx` - React Bits, copied unchanged (`https://reactbits.dev/r/Grainient-TS-TW.json`); full width, square-cornered, behind the hero and the contact block, with the preset props in `page.tsx`. Text over it always sits on a scrim
- `src/components/motion/Motion.tsx` - Lenis + GSAP spine (SplitText, ScrollTrigger). Sections opt in via `data-*` attributes documented at the top of the file, so `page.tsx` stays a server component. Pinned scene: the services slide sideways as four stages, Inspire, Learn, Plan, Build (`data-hscroll`, wide screens only)
- Copy leans future-facing (AI agents, agentic systems and workflows) but only claims what Chris actually does
- Reduced motion disables Lenis and every scroll effect, and the pinned sections fall back to normal flow; all content renders without JS
- The user wants GSAP, Lenis and React Bits kept. Rejected so far: ASCII-on-photos, a 3D card-wall hero, a 3D avatar of Chris, warm creme backgrounds, buttons that follow the cursor. Keep filler out: the name appears once in the nav and once in the copyright, no decorative wordmarks, kickers or invented claims
- Turbopack's dev filesystem cache is disabled in `next.config.ts` because it served stale CSS; it can still go stale, so if a CSS edit doesn't show, stop the dev server, `rm -rf .next/dev` and restart

## Photos

Source photos show client names on projected slides. Never publish a photo where a slide is legible; `room.jpg` has the slide blurred.
