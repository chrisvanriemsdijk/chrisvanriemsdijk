"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { siteConfig } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center px-6"
    >
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:gap-16"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Circular headshot */}
        <motion.div
          variants={fadeUp}
          className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full shadow-[var(--shadow-lg)] md:h-52 md:w-52"
        >
          <Image
            src="/photos/headshot.jpeg"
            alt="Chris van Riemsdijk"
            fill
            className="object-cover"
            sizes="208px"
            priority
          />
        </motion.div>

        {/* Text content */}
        <div className="text-center md:text-left">
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium tracking-[0.08em] uppercase text-[var(--text-tertiary)]"
          >
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mb-6 text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]"
          >
            {siteConfig.name}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xl font-medium text-[var(--text-secondary)] md:text-2xl"
          >
            {siteConfig.role}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="max-w-md text-sm leading-relaxed text-[var(--text-tertiary)]"
          >
            {siteConfig.tagline}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="h-8 w-[1px] bg-[var(--text-tertiary)]"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
