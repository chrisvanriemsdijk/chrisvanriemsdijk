"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { experience } from "@/lib/constants";

export default function Journey() {
  return (
    <section className="flex min-h-svh flex-col justify-center px-5 py-24 sm:px-8">
      <div className="mx-auto w-full max-w-[90rem]">
        <ScrollReveal>
          <p className="mono-label mb-4">/Where I&apos;ve been</p>
          <h2 className="display mb-16 text-[clamp(2.8rem,7vw,7rem)]">
            Journey
          </h2>
        </ScrollReveal>

        <div>
          {experience.map((exp, i) => (
            <ScrollReveal key={exp.company + exp.role} delay={i * 0.06}>
              <div className="grid gap-4 border-t border-[var(--hairline)] py-10 md:grid-cols-12 md:gap-8">
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
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {exp.role}
                    </h3>
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--ink-soft)] underline-offset-4 hover:underline"
                    >
                      {exp.company}
                      <ArrowUpRightIcon className="h-3.5 w-3.5 text-[var(--ink-faint)]" />
                    </a>
                  </div>
                </div>

                <p className="mono-label md:col-span-2">{exp.period}</p>

                <div className="md:col-span-6">
                  <p className="mb-4 text-base leading-relaxed text-[var(--ink-soft)]">
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
