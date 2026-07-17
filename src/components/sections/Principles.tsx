"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { fadeUp } from "@/lib/animations";
import { principles } from "@/lib/constants";

export default function Principles() {
  return (
    <section className="flex min-h-svh flex-col justify-center px-5 py-24 sm:px-8">
      <div className="mx-auto w-full max-w-[90rem]">
        <ScrollReveal>
          <p className="mono-label mb-4">/What I stand for</p>
          <h2 className="display mb-16 max-w-4xl text-[clamp(2.8rem,7vw,7rem)]">
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
              className="flex flex-col rounded-2xl bg-[var(--panel)] p-7 text-[var(--paper-on-panel)] md:grid md:row-span-3 md:grid-rows-subgrid md:p-9"
            >
              <span className="mono-label mb-16 !text-[var(--faint-on-panel)]">
                /0{i + 1}
              </span>
              <h3 className="mb-4 text-xl font-semibold tracking-tight md:text-2xl">
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
