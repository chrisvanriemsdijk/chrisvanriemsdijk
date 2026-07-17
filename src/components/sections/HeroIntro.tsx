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
        className="relative flex h-svh flex-col overflow-hidden px-5 pb-8 pt-24 sm:px-8"
      >
        <div className="relative z-10 flex w-full flex-1 flex-col justify-center">
          {/* Title block centered as a unit; the circular portrait hangs off
              its top-right corner */}
          <div className="relative mx-auto w-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-[-1.75rem] top-[-3.75rem] z-0 h-32 w-32 overflow-hidden rounded-full shadow-[0_16px_50px_rgba(19,18,16,0.25)] sm:right-[-3rem] sm:top-[-5.5rem] sm:h-44 sm:w-44 md:right-[-6rem] md:top-[-9rem] md:h-64 md:w-64"
            >
              <Image
                src="/photos/headshot.jpeg"
                alt="Chris van Riemsdijk"
                fill
                className="object-cover"
                sizes="256px"
                priority
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mono-label relative z-10 mb-8"
            >
              /Making AI clear, useful & human
            </motion.p>

            <h1 className="display relative z-10 text-[clamp(2rem,11vw,11rem)] text-[var(--ink)]">
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

        <div className="relative z-10 mx-auto flex w-full max-w-[90rem] items-end justify-end gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mono-label text-right"
          >
            /Based in {siteConfig.location}
            <br />
            /Creating since {siteConfig.creatingSince}
          </motion.p>
        </div>
      </section>

      {/* Screen 2 — intro */}
      <section
        id="about"
        className="flex min-h-svh items-center px-5 py-20 sm:px-8"
      >
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <ScrollReveal>
              <p className="mono-label mb-4">/About</p>
              <h2 className="display text-[clamp(3rem,6vw,6rem)]">Hey!</h2>
            </ScrollReveal>
          </div>

          <div className="flex justify-center md:col-span-5">
            <ScrollReveal delay={0.1} className="w-[88%]">
              <div className="relative aspect-[10/13] max-h-[66svh] w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(19,18,16,0.18)]">
                <Image
                  src="/photos/event-2.jpg"
                  alt="Chris speaking at an event"
                  fill
                  className="object-cover object-[65%_center]"
                  sizes="(max-width: 768px) 100vw, 40vw"
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
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)]"
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
