"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { fadeUp } from "@/lib/animations";
import { principles } from "@/lib/constants";

export default function Principles() {
  return (
    <section className="section">
      <div className="section-inner">
        <ScrollReveal>
          <p className="mono-label mb-3 sm:mb-4">/What I stand for</p>
          <h2 className="display section-heading max-w-4xl text-[clamp(2.5rem,9vw,7rem)]">
            Principles
          </h2>
        </ScrollReveal>

        {/* Subgrid: label / title / body each share a row, so titles align
            across cards no matter how long the copy is. */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-y-0">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-2xl bg-[var(--panel)] p-6 text-[var(--paper-on-panel)] sm:p-7 md:grid md:row-span-3 md:grid-rows-subgrid md:p-9"
            >
              {/* The big gap under the number is breathing room on a wide
                  card; on a phone it just pushes the title off-screen. */}
              <span className="mono-label mb-6 !text-[var(--faint-on-panel)] md:mb-16">
                /0{i + 1}
              </span>
              <h3 className="mb-3 text-lg font-semibold tracking-tight sm:text-xl md:mb-4 md:text-2xl">
                {principle.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--faint-on-panel)] md:text-base">
                {principle.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
