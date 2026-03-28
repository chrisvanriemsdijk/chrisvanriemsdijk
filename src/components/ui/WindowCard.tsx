"use client";

import { motion } from "framer-motion";
import TrafficLights from "./TrafficLights";

interface WindowCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function WindowCard({
  title,
  children,
  className = "",
}: WindowCardProps) {
  return (
    <motion.div
      className={`glass overflow-hidden ${className}`}
      whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex h-10 items-center gap-3 border-b border-black/[0.06] px-4">
        <TrafficLights />
        {title && (
          <span className="flex-1 text-center text-xs font-medium text-[var(--text-tertiary)] pr-[52px]">
            {title}
          </span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}
