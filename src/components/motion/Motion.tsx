"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// The page's scroll spine in one place. Server-rendered markup opts in with
// data attributes, so page.tsx stays a server component and every section
// reads correctly with no JS at all:
//   data-hero          headline lines rise on load; [data-hero-fade] lifts
//                      away as [data-hero-frame] scrolls out
//   data-reveal        heading lines rise when they scroll into view
//   data-words         text lights up word by word with scroll
//   data-count         number counts up once
//   data-clip          image frame opens from a narrow window as it scrolls in
//   data-parallax      element drifts against the scroll (value = strength)
//   data-hscroll       wide screens: the section pins and [data-hscroll-track]
//                      slides sideways; [data-hscroll-progress] fills along
//   data-section       the nav link with the same href shows as active
// With prefers-reduced-motion none of it runs and Lenis is not mounted.

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const all = (sel: string) => [...document.querySelectorAll<HTMLElement>(sel)];

export function Motion() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedQuery).matches,
    () => true,
  );
  const lenisRef = useRef<LenisRef>(null);

  // Lenis runs on GSAP's ticker (the pattern from the lenis/react README):
  // the ref is read on every tick, so it does not matter when Lenis mounts.
  useEffect(() => {
    const tick = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, []);
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      hero();
      all("[data-reveal]").forEach(reveal);
      all("[data-words]").forEach(words);
      all("[data-count]").forEach(count);
      all("[data-clip]").forEach(clip);
      all("[data-parallax]").forEach(parallax);
    });
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      all("[data-hscroll]").forEach(hscroll);
    });

    // Active section in the nav works with or without reduced motion. Created
    // after the pinned scenes so their extra scroll length is accounted for.
    const links = all("[data-nav] a[href^='#']");
    const navTriggers = all("[data-section]").map((section) =>
      ScrollTrigger.create({
        // A pinned section is wrapped in a spacer that holds its scroll length.
        trigger: section.parentElement?.classList.contains("pin-spacer") ? section.parentElement : section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          const link = links.find((l) => l.getAttribute("href") === `#${section.id}`);
          link?.toggleAttribute("data-active", self.isActive);
        },
      }),
    );

    // Fonts change line breaks, which moves every trigger.
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      navTriggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  if (reduced) return null;
  return <ReactLenis root options={{ autoRaf: false, anchors: { offset: -80 } }} ref={lenisRef} />;
}

function hero() {
  const title = document.querySelector<HTMLElement>("[data-hero]");
  if (!title) return;
  const split = SplitText.create(title, { type: "lines", mask: "lines" });
  gsap
    .timeline({ onComplete: () => split.revert() })
    .set(title, { autoAlpha: 1 })
    .from(split.lines, { yPercent: 115, duration: 1.4, ease: "expo.out", stagger: 0.11 }, 0.35);

  const frame = document.querySelector<HTMLElement>("[data-hero-frame]");
  if (frame) {
    gsap.to("[data-hero-fade]", {
      yPercent: -18,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: frame, start: "top top", end: "bottom top", scrub: true },
    });
  }
}

function reveal(el: HTMLElement) {
  const split = SplitText.create(el, { type: "lines", mask: "lines" });
  gsap.from(split.lines, {
    yPercent: 115,
    duration: 1.2,
    ease: "expo.out",
    stagger: 0.09,
    scrollTrigger: { trigger: el, start: "top 88%", once: true },
    onComplete: () => split.revert(),
  });
}

function words(el: HTMLElement) {
  const split = SplitText.create(el, { type: "words" });
  gsap.fromTo(
    split.words,
    { opacity: 0.16 },
    {
      opacity: 1,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 40%", scrub: true },
    },
  );
}

function count(el: HTMLElement) {
  const text = el.textContent ?? "";
  const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return;
  const [, num, rest] = match;
  const decimals = num.split(".")[1]?.length ?? 0;
  const state = { v: 0 };
  gsap.to(state, {
    v: parseFloat(num),
    duration: 2.2,
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 90%", once: true },
    onUpdate: () => {
      el.textContent = state.v.toFixed(decimals) + rest;
    },
  });
}

function clip(el: HTMLElement) {
  const img = el.querySelector("img");
  const scroll = { trigger: el, start: "top 95%", end: "top 30%", scrub: 0.6 };
  gsap.fromTo(el, { clipPath: "inset(14% 18% 14% 18% round 2rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", ease: "none", scrollTrigger: scroll });
  if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: scroll });
}

function parallax(el: HTMLElement) {
  const strength = Number(el.dataset.parallax) || 10;
  gsap.fromTo(
    el,
    { yPercent: -strength },
    { yPercent: strength, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
  );
}

function hscroll(section: HTMLElement) {
  const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
  if (!track) return;
  const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
  gsap
    .timeline({
      scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
    })
    .to(track, { x: () => -distance(), ease: "none" }, 0)
    .fromTo("[data-hscroll-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
}
