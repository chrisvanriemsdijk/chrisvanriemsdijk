"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function DockNavigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
        scrolled ? "glass shadow-[var(--shadow-md)]" : "bg-transparent"
      } rounded-full px-2 py-2`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center gap-1">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="relative rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200"
          >
            {activeSection === id && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-full bg-white/80 shadow-[var(--shadow-sm)]"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            )}
            <span
              className={`relative z-10 ${
                activeSection === id
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
