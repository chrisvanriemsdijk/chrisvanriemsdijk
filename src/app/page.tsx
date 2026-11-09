import Image from "next/image";
import Grainient from "@/components/bits/Grainient";
import { CopyEmail, EmailButton } from "@/components/EmailActions";
import { ArrowUpRightIcon, LinkedInIcon } from "@/components/ui/Icons";
import { experience, faqs, introText, principles, services, siteConfig, statement, stats, talks } from "@/lib/constants";

// The page reads in the order someone booking a speaker asks their questions:
// who is this, what do they believe, can they deliver, what can I book,
// where have they spoken, who are they, practicalities, how do I reach them.
// Motion hooks are data-* attributes, documented at the top of Motion.tsx.
const nav = [
  { href: "#results", label: "Results" },
  { href: "#services", label: "Services" },
  { href: "#talks", label: "Talks" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

// React Bits' Grainient, "aurora" preset. The whole palette comes from it.
const aurora = {
  colors: ["#05110f", "#065f46", "#34d399", "#ecfccb"],
  angle: 100,
  flow: 1.1,
  silk: 0.6,
  grainAmount: 0.08,
  bands: 3,
};

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 p-4 sm:p-6">
        <a href="#top" className="nav-glass rounded-full px-4 py-2.5 text-[0.95rem] font-semibold tracking-[-0.01em]">
          {siteConfig.name}
        </a>
        <nav data-nav aria-label="Sections" className="nav-glass hidden items-center gap-0.5 rounded-full p-1 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <EmailButton className="btn btn-primary btn-sm" />
      </header>

      <main id="main">
        <Hero />
        <Venues />
        <Belief />
        <Results />
        <Services />
        <Talks />
        <Principles />
        <About />
        <Faq />
      </main>

      <Contact />
    </>
  );
}

/* ---------------------------------------------------------------- hero */

function Hero() {
  return (
    <section id="top" data-hero-frame className="relative isolate h-svh min-h-[40rem] overflow-hidden bg-bg">
      <div className="contents">
        <Grainient {...aurora} className="!absolute inset-0 -z-10" />
        {/* Scrim: keeps the copy readable whichever band drifts behind it. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(5_17_15/0.92),rgb(5_17_15/0.55)_38%,transparent_72%)]" />

        <div data-hero-fade className="absolute inset-x-0 bottom-0 grid gap-10 p-6 sm:p-10 md:grid-cols-12 md:items-end md:p-14">
          <h1 data-hero className="t-display max-w-[11ch] md:col-span-8">
            I make AI clear, useful and human.
          </h1>
          <div className="rise md:col-span-4 md:justify-self-end [animation-delay:900ms]">
            <div className="mb-6 flex items-center gap-4">
              <Image src="/photos/face.jpg" alt="Chris van Riemsdijk" width={64} height={64} priority className="h-16 w-16 rounded-full object-cover ring-2 ring-cream/40" />
              <p className="text-[0.92rem] leading-snug text-ink-2">
                AI consultant at DataNorth AI
                <br />
                Groningen, the Netherlands
              </p>
            </div>
            <p className="max-w-[34ch] text-[1.1rem] leading-relaxed text-ink">
              Keynotes, workshops and hands-on builds that take teams from first prompts to agentic systems that do real work.
            </p>
            <p className="mt-3 max-w-[34ch] text-[0.95rem] text-ink-2">
              {siteConfig.workshopsGiven} sessions across the Netherlands, Europe and the US.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <EmailButton className="btn btn-primary" />
              <a href="#talks" className="btn btn-glass">
                Recent talks
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- venues */

function Venues() {
  const names = talks.map((t) => t.venue.split(",")[0]);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {names.map((n) => (
        <li key={n} className="flex items-center gap-10 pr-10 text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium tracking-[-0.03em] text-ink-3 sm:gap-16 sm:pr-16">
          {n}
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Recent stages" className="overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:py-14">
      <div className="marquee">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- belief */

function Belief() {
  return (
    <section aria-label="What I believe" className="wrap block-y !pt-16 md:!pt-24">
      <p data-words className="text-[clamp(2.1rem,5.2vw,5rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance">
        {statement}
      </p>
      <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
        <p className="t-lead md:col-span-5 md:col-start-8">{introText[0]}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- results */

function Results() {
  const items = [{ value: siteConfig.workshopsGiven, label: "workshops and talks given" }, ...stats];
  return (
    <section id="results" data-section className="wrap">
      <div className="grid gap-6 md:grid-cols-2 md:items-end">
        <h2 data-reveal className="t-h2 max-w-[13ch]">
          What changes after a session.
        </h2>
        <p className="t-lead max-w-[38ch] md:justify-self-end">What participants report once they are back at their desks.</p>
      </div>

      <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="flex flex-col-reverse justify-end bg-bg p-7 md:p-9">
            <dt className="mt-5 max-w-[22ch] text-[0.98rem] leading-snug text-ink-2">{s.label}</dt>
            <dd data-count className="t-num t-glow text-[clamp(3.6rem,6vw,5.6rem)]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <div data-clip className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:aspect-[21/9]">
        <Image src="/photos/room.jpg" alt="Chris presenting to a full room" fill sizes="(max-width: 1344px) 100vw, 1280px" className="object-cover object-[62%_35%]" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ services */

// Each stage gets its own slice of the aurora: the glow moves across the
// panel and warms from emerald to cream as the route nears production.
const glows = [
  "radial-gradient(70% 80% at 85% 0%, rgb(6 95 70 / 0.9), transparent 70%), radial-gradient(50% 60% at 100% 30%, rgb(52 211 153 / 0.35), transparent 70%)",
  "radial-gradient(70% 80% at 70% 100%, rgb(6 95 70 / 0.85), transparent 70%), radial-gradient(45% 55% at 95% 85%, rgb(52 211 153 / 0.45), transparent 70%)",
  "radial-gradient(75% 85% at 100% 50%, rgb(6 95 70 / 0.8), transparent 70%), radial-gradient(45% 55% at 90% 40%, rgb(52 211 153 / 0.55), transparent 70%), radial-gradient(25% 30% at 96% 45%, rgb(236 252 203 / 0.35), transparent 70%)",
  "radial-gradient(80% 90% at 90% 10%, rgb(6 95 70 / 0.75), transparent 70%), radial-gradient(55% 60% at 85% 20%, rgb(52 211 153 / 0.6), transparent 70%), radial-gradient(35% 40% at 92% 12%, rgb(236 252 203 / 0.55), transparent 70%)",
];

// Wide screens: the section pins and the four stages slide past sideways
// (data-hscroll in Motion.tsx). Elsewhere, and with reduced motion, the
// panels simply stack.
function Services() {
  return (
    <section id="services" data-section data-hscroll className="relative mt-28 md:mt-40 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:items-center lg:motion-safe:overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 hidden h-px bg-line lg:motion-safe:block">
        <div data-hscroll-progress className="h-full origin-left bg-accent" />
      </div>

      <div data-hscroll-track className="wrap flex flex-col gap-3 lg:motion-safe:mx-0 lg:motion-safe:w-max lg:motion-safe:max-w-none lg:motion-safe:flex-row lg:motion-safe:items-stretch lg:motion-safe:pr-[8vw] lg:motion-safe:pl-[max(2rem,calc((100vw-84rem)/2+2rem))]">
        <div className="mb-10 flex flex-col justify-end lg:motion-safe:mb-0 lg:motion-safe:w-[30rem] lg:motion-safe:shrink-0 lg:motion-safe:pr-16 lg:motion-safe:pb-4">
          <h2 data-reveal className="t-h2 max-w-[12ch]">
            From first spark to working system.
          </h2>
          <p className="t-lead mt-6 max-w-[36ch]">
            Four ways to work together. Most work starts with a talk or a workshop. Some of it ends with AI agents in production.
          </p>
        </div>

        {services.map((s, i) => (
          <article
            key={s.title}
            className="relative isolate flex min-h-[26rem] flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface p-7 sm:p-10 lg:motion-safe:h-[72svh] lg:motion-safe:max-h-[44rem] lg:motion-safe:w-[min(62vw,46rem)] lg:motion-safe:shrink-0 lg:motion-safe:p-12"
          >
            <div aria-hidden className="absolute inset-0 -z-10" style={{ background: glows[i] }} />
            <div className="flex items-start justify-between gap-6">
              <p className="text-[0.95rem] text-ink-2">
                <span className="tabular-nums text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-ink-3"> / {String(services.length).padStart(2, "0")}</span>
              </p>
              <p className="t-glow text-[clamp(3rem,7vw,6.5rem)] leading-[0.85] font-semibold tracking-[-0.06em]">{s.stage}</p>
            </div>
            <div className="mt-auto pt-16">
              <h3 className="text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.04em]">{s.title}</h3>
              <p className="mt-4 max-w-[44ch] text-[1.05rem] leading-relaxed text-ink-2">{s.description}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line-strong bg-bg/40 px-3 py-1 text-[0.82rem] text-ink-2 backdrop-blur">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- talks */

function Talks() {
  return (
    <section id="talks" data-section className="wrap block-y">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2 data-reveal className="t-h2 max-w-[10ch]">
              Recent stages.
            </h2>
            <p className="t-lead mt-6 max-w-[34ch]">From conference keynotes to full-day sessions with legal and finance teams.</p>
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-[1.75rem] md:block">
              <div data-parallax="8" className="absolute -inset-y-[10%] inset-x-0">
                <Image src="/photos/stage.jpg" alt="Chris explaining a point during a talk" fill sizes="40vw" className="object-cover object-[50%_20%]" />
              </div>
            </div>
          </div>
        </div>

        <ol className="md:col-span-7">
          {talks.map((t, i) => (
            <li key={t.title} className="border-b border-line first:border-t">
              <a href={t.url} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-8 md:py-10">
                <span className="self-start pt-2 text-[0.85rem] text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[clamp(1.45rem,2.5vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.035em] transition-colors duration-300 group-hover:text-cream">
                    {t.title}
                  </span>
                  <span className="mt-2 block text-[0.98rem] text-ink-3">
                    {t.kind} at {t.venue}
                  </span>
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-line-strong text-ink-2 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                  <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- principles */

function Principles() {
  return (
    <section aria-labelledby="principles" className="wrap">
      <h2 id="principles" data-reveal className="t-h2 max-w-[14ch]">
        How I work.
      </h2>
      <div className="mt-14 grid gap-3 md:grid-cols-3">
        {principles.map((p, i) => (
          <div key={p.title} className="panel flex min-h-[20rem] flex-col p-8 md:p-10">
            <span className="t-num t-glow text-[3.2rem]">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="t-h3 mt-auto pt-12">{p.title}</h3>
            <p className="mt-3 text-ink-2">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- about */

function About() {
  return (
    <section id="about" data-section className="wrap block-y">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] md:sticky md:top-28">
            <Image src="/photos/headshot.jpeg" alt="Portrait of Chris van Riemsdijk" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-[50%_35%]" />
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <h2 data-reveal className="t-h2 max-w-[12ch]">
            Engineer first, then teacher.
          </h2>
          <div className="t-lead mt-8 space-y-5">
            {introText.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <ol className="mt-14 border-t border-line">
            {experience.map((exp) => (
              <li key={exp.company} className="grid gap-1 border-b border-line py-7 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <span className="text-[0.92rem] text-ink-3 tabular-nums sm:pt-1">{exp.period}</span>
                <div>
                  <p className="text-[1.1rem] font-medium tracking-[-0.01em]">
                    {exp.role},{" "}
                    <a href={exp.url} target="_blank" rel="noopener noreferrer" className="link">
                      {exp.company}
                    </a>
                  </p>
                  <p className="mt-2 text-[0.97rem] text-ink-2">{exp.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- faq */

function Faq() {
  return (
    <section id="faq" data-section className="wrap block-y !pt-0">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 data-reveal className="t-h2 max-w-[11ch]">
            Before the first session.
          </h2>
          <p className="t-lead mt-6 max-w-[32ch]">Anything missing? Email me and ask.</p>
        </div>
        <div className="md:col-span-7">
          {faqs.map((f) => (
            <details key={f.q} className="faq border-b border-line first:border-t">
              <summary className="flex items-center justify-between gap-6 py-7 text-[1.15rem] font-medium tracking-[-0.015em] md:text-[1.3rem]">
                {f.q}
                <span aria-hidden className="plus grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="max-w-[60ch] pb-8 text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- contact */

// The aurora returns to close the page. The copy sits in the middle, over a
// radial scrim, so it stays readable whichever band drifts behind it.
function Contact() {
  return (
    <footer id="contact">
      <div className="relative isolate flex min-h-[88svh] flex-col overflow-hidden">
        <Grainient {...aurora} variation={1.6} className="!absolute inset-0 -z-10" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_50%,rgb(5_17_15/0.82),rgb(5_17_15/0.35)_70%,transparent)]" />

        <div className="wrap flex flex-1 flex-col items-center justify-center py-28 text-center">
          <h2 data-reveal className="t-display max-w-[12ch] !text-[clamp(2.8rem,7vw,7rem)]">
            Let&apos;s make AI work for your team.
          </h2>
          <p className="mt-7 max-w-[44ch] text-[1.15rem] leading-relaxed text-ink">
            Tell me about your team and what you want to get out of it. I&apos;ll come back with a format that fits.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <EmailButton className="btn btn-primary" />
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-glass">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
          </div>
          <div className="mt-6">
            <CopyEmail className="btn btn-glass btn-sm" textClassName="text-ink-2" />
          </div>
        </div>

      </div>
      <div className="wrap flex flex-col gap-3 py-6 text-[0.9rem] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}, {siteConfig.location}
        </p>
        <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
          GitHub <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
