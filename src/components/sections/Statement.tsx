"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { statement } from "@/lib/constants";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef<HTMLElement>(null);

  // The section is taller than one screen and the text is pinned for the
  // extra height — words only start filling once the view is fully entered. Progress
  // is derived from the section's own geometry (offsetTop is stable) rather
  // than framer's target resolution.
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => {
    const el = ref.current;
    if (!el) return 0;
    const start = el.offsetTop;
    const length = el.offsetHeight - window.innerHeight;
    if (length <= 0) return 1;
    return Math.min(1, Math.max(0, (v - start) / length));
  });

  const words = statement.split(" ");

  return (
    <section ref={ref} className="relative h-[160svh]">
      <div className="sticky top-0 flex h-svh items-center px-5 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[clamp(1.4rem,3.4vw,2.8rem)] font-medium leading-snug tracking-tight text-[var(--ink)]">
            {words.map((word, i) => (
              <Word
                key={i}
                progress={progress}
                range={[
                  (i / words.length) * 0.9,
                  ((i + 1) / words.length) * 0.9,
                ]}
              >
                {word}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
