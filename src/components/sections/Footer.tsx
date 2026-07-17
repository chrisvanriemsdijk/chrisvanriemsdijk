"use client";

import { useCallback } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  BriefcaseIcon,
  GitHubIcon,
  HomeIcon,
  LinkedInIcon,
  MailIcon,
  MicIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { siteConfig } from "@/lib/constants";

// Obfuscate email: split into parts so it never appears as a
// single string in the static HTML that bots parse.
const emailParts = siteConfig.email.split("@");
const emailUser = btoa(emailParts[0]);
const emailDomain = btoa(emailParts[1]);

const quickLinks = [
  { href: "#top", label: "Home", icon: HomeIcon },
  { href: "#about", label: "About", icon: UserIcon },
  { href: "#work", label: "Work", icon: BriefcaseIcon },
  { href: "#talks", label: "Talks", icon: MicIcon },
];

export default function Footer() {
  const handleEmailClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const addr = `${atob(emailUser)}@${atob(emailDomain)}`;
      window.location.href = `mailto:${addr}`;
    },
    []
  );

  return (
    <section id="contact">
      {/* Let's talk */}
      <div className="flex min-h-svh items-center px-5 py-24 sm:px-8">
        <div className="mx-auto grid w-full max-w-[90rem] items-end gap-10 md:grid-cols-2">
          <ScrollReveal>
            <p className="mono-label mb-4">/Get in touch</p>
            <h2 className="display text-[clamp(3.5rem,9vw,9rem)]">
              Let&apos;s talk.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mb-8 max-w-md text-base leading-relaxed text-[var(--ink-soft)] md:text-lg">
              Thinking about AI for your organization, or looking for a speaker
              who makes it click? Send me a message — I read everything.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={handleEmailClick}
                className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-[var(--ink)] px-6 text-sm font-semibold text-[var(--paper)] transition-transform hover:scale-[1.03]"
              >
                <MailIcon className="h-4 w-4" />
                Email me
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-[var(--hairline-strong)] px-6 text-sm font-semibold transition-colors hover:bg-[var(--paper-dim)]"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-[var(--hairline-strong)] px-6 text-sm font-semibold transition-colors hover:bg-[var(--paper-dim)]"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Dark footer with giant watermark */}
      <footer className="relative overflow-hidden bg-[var(--panel)] px-5 pb-0 pt-20 text-[var(--paper-on-panel)] sm:px-8 md:pt-28">
        <div className="relative z-10 mx-auto grid w-full max-w-[90rem] gap-12 pb-32 md:grid-cols-12 md:pb-48">
          <div className="md:col-span-6">
            <p className="display max-w-md text-[clamp(2rem,4.5vw,4rem)]">
              Making AI clear, useful & human.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="mono-label mb-5 !text-[var(--faint-on-panel)]">
              /Quick links
            </p>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-[var(--paper-on-panel)] transition-colors hover:bg-white/15"
                >
                  <link.icon className="h-3.5 w-3.5 text-[var(--faint-on-panel)]" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="mono-label mb-5 !text-[var(--faint-on-panel)]">
              /Contact
            </p>
            <a
              href="#contact"
              onClick={handleEmailClick}
              className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
            >
              <MailIcon className="h-3.5 w-3.5 text-[var(--faint-on-panel)]" />
              Email me directly
            </a>
            <p className="mt-4 text-xs text-[var(--faint-on-panel)]">
              &copy; {new Date().getFullYear()} {siteConfig.name}
            </p>
          </div>
        </div>

        {/* Giant name watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-0 flex justify-center"
        >
          <span className="display -mb-[0.23em] whitespace-nowrap text-[clamp(6rem,21vw,22rem)] leading-none text-white/[0.06]">
            Chris
          </span>
        </div>
      </footer>
    </section>
  );
}
