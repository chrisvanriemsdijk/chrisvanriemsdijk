"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { stats } from "@/lib/constants";

export default function Impact() {
  return (
    <section className="section">
      <div className="section-inner">
        <ScrollReveal>
          <p className="mono-label mb-6 sm:mb-10">
            /In numbers — what participants report after my workshops
          </p>
        </ScrollReveal>

        {/* Two columns from the smallest screen up: a single column of four
            stacked stat cards is a lot of scrolling for very little content,
            and the numbers are short enough to sit side by side at 320px. */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[var(--hairline)] lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col justify-between gap-4 bg-[var(--paper)] p-4 sm:gap-8 sm:p-6 md:p-8">
                <span className="display text-[clamp(1.9rem,7vw,4.5rem)]">
                  {stat.value}
                </span>
                <span className="max-w-[24ch] text-xs leading-relaxed text-[var(--ink-soft)] sm:text-sm">
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
