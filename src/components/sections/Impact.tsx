"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { stats } from "@/lib/constants";

export default function Impact() {
  return (
    <section className="flex min-h-svh flex-col justify-center px-5 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-[90rem]">
        <ScrollReveal>
          <p className="mono-label mb-10">
            /In numbers — what participants report after my workshops
          </p>
        </ScrollReveal>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col justify-between gap-8 bg-[var(--paper)] p-6 md:p-8">
                <span className="display text-[clamp(2.6rem,5vw,4.5rem)]">
                  {stat.value}
                </span>
                <span className="max-w-[24ch] text-sm leading-relaxed text-[var(--ink-soft)]">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
