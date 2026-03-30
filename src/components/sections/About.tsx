"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { aboutText } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="px-5 py-20 sm:px-6 md:py-32">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="mb-12 text-xs font-medium tracking-[0.08em] uppercase text-[var(--text-tertiary)]">
            About
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <ScrollReveal>
              <h2 className="mb-6 text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--text-primary)] sm:mb-8 sm:text-3xl md:text-4xl">
                On a mission to make AI<br />
                accessible to all.
              </h2>
            </ScrollReveal>
            {aboutText.map((text, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <p className="mb-5 text-base leading-relaxed text-[var(--text-secondary)]">
                  {text}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <div className="md:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]">
                <Image
                  src="/photos/event-2.jpg"
                  alt="Chris at REEF Grip Connect"
                  fill
                  className="object-cover object-[65%_center]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
