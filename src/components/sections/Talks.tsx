"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { talks } from "@/lib/constants";

function TalkRow({ talk }: { talk: (typeof talks)[number] }) {
  const inner = (
    <div className="group flex flex-col gap-2 border-t border-[var(--hairline)] py-7 sm:flex-row sm:items-baseline sm:justify-between md:py-8">
      <div className="flex items-baseline gap-3">
        <h3 className="text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-2xl">
          {talk.title}
        </h3>
        {talk.url && (
          <span className="text-[var(--ink-faint)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="mono-label">
        {talk.venue} · {talk.kind}
      </p>
    </div>
  );

  return talk.url ? (
    <a href={talk.url} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function Talks() {
  return (
    <section
      id="talks"
      className="flex min-h-svh flex-col justify-center overflow-hidden px-5 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <ScrollReveal>
          <p className="mono-label mb-4">
            /On stage — 200+ workshops & talks across NL, Europe and the US
          </p>
          <h2 className="display mb-16 text-[clamp(2.8rem,7vw,7rem)]">
            Talks
          </h2>
        </ScrollReveal>

        <div>
          {talks.map((talk) => (
            <ScrollReveal key={talk.title}>
              <TalkRow talk={talk} />
            </ScrollReveal>
          ))}
          <div className="border-t border-[var(--hairline)]" />
        </div>
      </div>
    </section>
  );
}
