"use client";

import ScrollReveal from "./ScrollReveal";

export default function SectionLabel({
  children,
  className = "mb-12",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ScrollReveal>
      <p
        className={`text-xs font-medium tracking-[0.08em] uppercase text-[var(--text-tertiary)] ${className}`}
      >
        {children}
      </p>
    </ScrollReveal>
  );
}
