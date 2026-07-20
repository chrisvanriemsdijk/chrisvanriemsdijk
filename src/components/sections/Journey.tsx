"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { experience } from "@/lib/constants";

export default function Journey() {
  return (
    <section className="section">
      <div className="section-inner">
        <ScrollReveal>
          <p className="mono-label mb-3 sm:mb-4">/Where I&apos;ve been</p>
          <h2 className="display section-heading text-[clamp(2.5rem,9vw,7rem)]">
            Journey
          </h2>
        </ScrollReveal>

        <div>
          {experience.map((exp, i) => (
            <ScrollReveal key={exp.company + exp.role} delay={i * 0.06}>
              <div className="grid gap-3 border-t border-[var(--hairline)] py-8 md:grid-cols-12 md:gap-8 md:py-10">
                {/* On mobile the period reads as a caption under the role, so
                    it is pulled up next to the heading block rather than
                    sitting in its own full-width row (order-2 below). */}
                <div className="flex items-start gap-4 md:col-span-4">
                  {exp.logo ? (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--panel)] font-mono text-[10px] font-medium text-[var(--paper-on-panel)]">
                      RUG
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
                      {exp.role}
                    </h3>
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target inline-flex items-center gap-1 text-sm font-medium text-[var(--ink-soft)] underline-offset-4 hover:underline"
                    >
                      {exp.company}
                      <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 text-[var(--ink-faint)]" />
                    </a>
                  </div>
                </div>

                <p className="mono-label -mt-2 md:col-span-2 md:mt-0">
                  {exp.period}
                </p>

                <div className="md:col-span-6">
                  <p className="mb-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base md:mb-4">
                    {exp.description}
                  </p>
                  {exp.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-relaxed text-[var(--ink-soft)]"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--ink-faint)]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
          <div className="border-t border-[var(--hairline)]" />
        </div>
      </div>
    </section>
  );
}
