"use client";

import { useCallback, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  BriefcaseIcon,
  CheckIcon,
  CopyIcon,
  GitHubIcon,
  HomeIcon,
  LinkedInIcon,
  MailIcon,
  MicIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { siteConfig } from "@/lib/constants";
import { copyEmail, emailDisplay, getEmail, openMail } from "@/lib/email";

const quickLinks = [
  { href: "#top", label: "Home", icon: HomeIcon },
  { href: "#about", label: "About", icon: UserIcon },
  { href: "#work", label: "Work", icon: BriefcaseIcon },
  { href: "#talks", label: "Talks", icon: MicIcon },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState<string | null>(null);

  const handleEmailClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      openMail();
    },
    []
  );

  // Copying is the escape hatch for anyone without a mail client wired up to
  // mailto: — which on a phone browser is a lot of people. Revealing the plain
  // address at the same time means they can also just read it off the screen.
  const handleCopy = useCallback(async () => {
    const ok = await copyEmail();
    setRevealed(getEmail());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <section id="contact">
      {/* Let's talk */}
      <div className="section">
        <div className="section-inner grid items-end gap-8 md:grid-cols-2 md:gap-10">
          <ScrollReveal>
            <p className="mono-label mb-3 sm:mb-4">/Get in touch</p>
            <h2 className="display text-[clamp(3rem,12vw,9rem)]">
              Let&apos;s talk.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mb-6 max-w-md text-base leading-relaxed text-[var(--ink-soft)] sm:mb-8 md:text-lg">
              Thinking about AI for your organization, or looking for a speaker
              who makes it click? Send me a message — I read everything.
            </p>
            {/* Full-width stacked buttons on mobile: three pills wrapping mid-row
                reads as debris, and each one is a primary action. */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <a
                href="#contact"
                onClick={handleEmailClick}
                rel="nofollow"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[var(--ink)] px-6 text-sm font-semibold text-[var(--paper)] transition-transform hover:scale-[1.03] sm:justify-start"
              >
                <MailIcon className="h-4 w-4" />
                Email me
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-[var(--hairline-strong)] px-6 text-sm font-semibold transition-colors hover:bg-[var(--paper-dim)] sm:justify-start"
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy address"}
              </button>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-[var(--hairline-strong)] px-6 text-sm font-semibold transition-colors hover:bg-[var(--paper-dim)] sm:justify-start"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-[var(--hairline-strong)] px-6 text-sm font-semibold transition-colors hover:bg-[var(--paper-dim)] sm:justify-start"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
            </div>
            <p
              aria-live="polite"
              className="mono-label mt-4 break-all"
            >
              {revealed ?? emailDisplay}
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Dark footer with giant watermark */}
      <footer className="relative overflow-hidden bg-[var(--panel)] px-5 pb-0 pt-16 text-[var(--paper-on-panel)] sm:px-8 sm:pt-20 md:pt-28">
        <div className="relative z-10 mx-auto grid w-full max-w-[90rem] gap-10 pb-24 sm:gap-12 sm:grid-cols-2 sm:pb-32 md:grid-cols-12 md:pb-48">
          <div className="sm:col-span-2 md:col-span-6">
            <p className="display max-w-md text-[clamp(1.6rem,7vw,4rem)]">
              Making AI clear, useful &amp; human.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="mono-label mb-4 !text-[var(--faint-on-panel)] sm:mb-5">
              /Quick links
            </p>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-[var(--paper-on-panel)] transition-colors hover:bg-white/15"
                >
                  <link.icon className="h-3.5 w-3.5 text-[var(--faint-on-panel)]" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="mono-label mb-4 !text-[var(--faint-on-panel)] sm:mb-5">
              /Contact
            </p>
            <a
              href="#contact"
              onClick={handleEmailClick}
              rel="nofollow"
              className="inline-flex min-h-11 items-center gap-2 text-sm underline-offset-4 hover:underline"
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
          <span className="display -mb-[0.23em] whitespace-nowrap text-[clamp(5rem,24vw,22rem)] leading-none text-white/[0.06]">
            Chris
          </span>
        </div>
      </footer>
    </section>
  );
}
