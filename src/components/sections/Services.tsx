"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { services } from "@/lib/constants";

export default function Services() {
  return (
    <section
      id="work"
      className="flex min-h-svh flex-col justify-center px-5 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <ScrollReveal>
          <p className="mono-label mb-4">/What I do</p>
          <h2 className="display mb-16 text-[clamp(2.8rem,7vw,7rem)]">
            Services
          </h2>
        </ScrollReveal>

        <div>
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.06}>
              <div className="group flex flex-col gap-3 border-t border-[var(--hairline)] py-8 transition-colors hover:bg-[var(--paper-dim)] sm:flex-row sm:items-center sm:justify-between md:py-10">
                <h3 className="text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
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
