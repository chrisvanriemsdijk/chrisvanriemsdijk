"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { talks } from "@/lib/constants";

function TalkRow({ talk }: { talk: (typeof talks)[number] }) {
  const inner = (
    <div className="group flex flex-col gap-1.5 border-t border-[var(--hairline)] py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:py-7 md:py-8">
      <div className="flex items-baseline gap-3">
        <h3 className="text-lg font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-xl md:text-2xl">
          {talk.title}
        </h3>
        {talk.url && (
          <span className="shrink-0 text-[var(--ink-faint)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
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
    <section id="talks" className="section overflow-hidden">
      <div className="section-inner">
        <ScrollReveal>
          <p className="mono-label mb-3 sm:mb-4">
            /On stage — 200+ workshops & talks across NL, Europe and the US
          </p>
          <h2 className="display section-heading text-[clamp(2.5rem,9vw,7rem)]">
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
