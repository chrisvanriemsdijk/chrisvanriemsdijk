import type { Variants } from "framer-motion";

export const appleEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const baseTransition = {
  duration: 0.6,
  ease: appleEase,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const hoverLift = {
  whileHover: { y: -2, boxShadow: "0 6px 30px rgba(0,0,0,0.1)" },
  transition: { duration: 0.25, ease: appleEase },
};
