"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, MailIcon } from "@/components/ui/Icons";
import { copyEmail, emailDisplay, getEmail, openMail } from "@/lib/email";

// The address only exists in the browser, at the moment someone acts on it
// (see lib/email.ts), so every email entry point is a client component.

export function EmailButton({ className = "btn btn-primary" }: { className?: string }) {
  return (
    <a
      href="#contact"
      rel="nofollow"
      onClick={(e) => {
        e.preventDefault();
        openMail();
      }}
      className={className}
    >
      <MailIcon className="h-4 w-4" />
      Email me
    </a>
  );
}

export function CopyEmail({ className = "btn btn-outline", textClassName = "text-ink-2" }: { className?: string; textClassName?: string }) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState<string | null>(null);

  // Copying is the fallback for anyone without a mail client behind mailto:,
  // and revealing the address lets them read it off the screen as well.
  const handleCopy = async () => {
    const ok = await copyEmail();
    setRevealed(getEmail());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <button type="button" onClick={handleCopy} className={className}>
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        {copied ? "Copied" : "Copy address"}
      </button>
      <span aria-live="polite" className={`break-all text-sm ${textClassName}`}>
        {revealed ?? emailDisplay}
      </span>
    </div>
  );
}
