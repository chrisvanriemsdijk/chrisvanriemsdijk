"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { experience, calcDuration, type Experience } from "@/lib/constants";

function ExperienceCard({
  exp,
  isExpanded,
  onToggle,
}: {
  exp: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isCurrent = exp.endDate === null;

  return (
    <motion.div
      className="glass cursor-pointer overflow-hidden"
      whileHover={{ y: -2, boxShadow: "0 6px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onToggle}
    >
      <div className="flex items-start gap-4 p-5">
        {/* Company logo */}
        <a
          href={exp.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0"
        >
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm">
            <Image
              src={exp.logo}
              alt={exp.company}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        </a>

        {/* Main info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              {exp.role}
            </h3>
            {isCurrent && (
              <span className="rounded-full bg-[#28C840]/10 px-2 py-0.5 text-[10px] font-medium text-[#1a7e2e]">
                Current
              </span>
            )}
          </div>
          <a
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            {exp.company}
          </a>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            {exp.startDate} — {exp.endDate ?? "Present"} · {calcDuration(exp.startDate, exp.endDate)}
          </p>
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 shrink-0 text-[var(--text-tertiary)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/[0.06] px-5 pb-5 pt-4">
              <p className="mb-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {exp.description}
              </p>
              <ul className="mb-4 space-y-2">
                {exp.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-tertiary)]" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="work" className="bg-[var(--bg-secondary)] px-5 py-20 sm:px-6 md:py-32">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="mb-12 text-xs font-medium tracking-[0.08em] uppercase text-[var(--text-tertiary)]">
            Experience
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          {experience.map((exp, i) => (
            <ScrollReveal key={exp.company + exp.role} delay={i * 0.1}>
              <ExperienceCard
                exp={exp}
                isExpanded={expandedIndex === i}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
