"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { services } from "@/lib/constants";

export default function Services() {
  return (
    <section id="work" className="section">
      <div className="section-inner">
        <ScrollReveal>
          <p className="mono-label mb-3 sm:mb-4">/What I do</p>
          <h2 className="display section-heading text-[clamp(2.5rem,9vw,7rem)]">
            Services
          </h2>
        </ScrollReveal>

        <div>
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.06}>
              <div className="group flex flex-col gap-2 border-t border-[var(--hairline)] py-6 transition-colors hover:bg-[var(--paper-dim)] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-8 md:py-10">
                <h3 className="text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl md:text-3xl">
                  {service.title}
                </h3>
                <p className="mono-label flex flex-wrap gap-x-2 gap-y-1 sm:justify-end">
                  {service.tags.map((tag, j) => (
                    <span key={tag}>
                      {tag}
                      {j < service.tags.length - 1 && (
                        <span className="ml-2">·</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </ScrollReveal>
          ))}
          <div className="border-t border-[var(--hairline)]" />
        </div>
      </div>
    </section>
  );
}
