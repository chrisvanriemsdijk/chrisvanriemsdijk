"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { siteConfig, introText } from "@/lib/constants";

const lineReveal = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 + i * 0.12 },
  }),
};

export default function HeroIntro() {
  return (
    <div>
      {/* Screen 1 — hero */}
      <section
        id="top"
        className="relative flex min-h-svh flex-col overflow-hidden px-5 pb-8 pt-20 sm:px-8 sm:pt-24"
      >
        <div className="relative z-10 flex w-full flex-1 flex-col justify-center">
          {/* On sm+ the title block is centred as a unit with the circular
              portrait hanging off its top-right corner. That overhang has
              nowhere to go on a phone — it lands on the label and runs past
              the right edge — so below sm the portrait becomes a normal
              stacked element above the title instead. */}
          <div className="relative mx-auto flex w-full flex-col items-start sm:block sm:w-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-0 mb-6 h-24 w-24 shrink-0 overflow-hidden rounded-full shadow-[0_16px_50px_rgba(19,18,16,0.25)] sm:absolute sm:right-[-1.5rem] sm:top-[-4rem] sm:mb-0 sm:h-32 sm:w-32 lg:right-[-4rem] lg:top-[-7rem] lg:h-52 lg:w-52 xl:right-[-6rem] xl:top-[-9rem] xl:h-64 xl:w-64"
            >
              <Image
                src="/photos/headshot.jpeg"
                alt="Chris van Riemsdijk"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 208px, 256px"
                priority
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mono-label relative z-10 mb-5 sm:mb-8"
            >
              /Making AI clear, useful &amp; human
            </motion.p>

            <h1 className="display relative z-10 text-[clamp(2.75rem,13vw,11rem)] text-[var(--ink)]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  AI Expert
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  &amp; Speaker
                </motion.span>
              </span>
            </h1>
          </div>
        </div>

        {/* Left-aligned on mobile so it reads as a continuation of the title
            block; pinned right on wider screens where the hero is centred.
            The extra bottom padding keeps it clear of the palette trigger. */}
        <div className="relative z-10 mx-auto flex w-full max-w-[90rem] items-end justify-start pb-16 sm:justify-end sm:pb-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mono-label text-left sm:text-right"
          >
            /Based in {siteConfig.location}
            <br />
            /Creating since {siteConfig.creatingSince}
          </motion.p>
        </div>
      </section>

      {/* Screen 2 — intro.
          Three columns on desktop (label / photo / copy). On mobile that
          becomes a single stack, and the portrait is capped so it can't push
          the copy an entire screen down. */}
      <section id="about" className="section">
        <div className="section-inner grid items-center gap-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <ScrollReveal>
              <p className="mono-label mb-3 sm:mb-4">/About</p>
              <h2 className="display text-[clamp(2.5rem,9vw,6rem)]">Hey!</h2>
            </ScrollReveal>
          </div>

          <div className="flex justify-center md:col-span-5">
            <ScrollReveal delay={0.1} className="w-full max-w-sm md:w-[88%] md:max-w-none">
              <div className="relative aspect-[10/13] max-h-[52svh] w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(19,18,16,0.18)] md:max-h-[66svh]">
                <Image
                  src="/photos/event-2.jpg"
                  alt="Chris speaking at an event"
                  fill
                  className="object-cover object-[65%_center]"
                  sizes="(max-width: 768px) 90vw, 40vw"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-5 md:col-span-4">
            {introText.map((text, i) => (
              <ScrollReveal key={i} delay={0.15 + i * 0.1}>
                <p className="text-base leading-relaxed text-[var(--ink-soft)] md:text-lg">
                  {text}
                </p>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.35}>
              <a
                href="#work"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--ink)]"
              >
                See what I do
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--hairline-strong)] transition-transform group-hover:-rotate-45">
                  <ArrowUpRightIcon className="h-3.5 w-3.5 rotate-45" />
                </span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
