"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/constants";
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  CheckIcon,
  ChevronLeftIcon,
  CloseIcon,
  CopyIcon,
  GitHubIcon,
  HomeIcon,
  LinkedInIcon,
  MailIcon,
  MessageIcon,
  MicIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/Icons";

const RECENT_KEY = "palette-recent";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Command {
  id: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
  run: () => void;
}

interface Group {
  title: string;
  items: Command[];
}

const icons = {
  home: <HomeIcon />,
  user: <UserIcon />,
  briefcase: <BriefcaseIcon />,
  mic: <MicIcon />,
  mail: <MailIcon />,
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  copy: <CopyIcon />,
  check: <CheckIcon />,
  search: <SearchIcon />,
  close: <CloseIcon />,
  arrow: <ArrowUpRightIcon />,
  message: <MessageIcon />,
  back: <ChevronLeftIcon />,
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"search" | "message">("search");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const remember = useCallback((label: string) => {
    setRecent((prev) => {
      const next = [label, ...prev.filter((r) => r !== label)].slice(0, 3);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable
      }
      return next;
    });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    setView("search");
  }, []);

  // Compose a mailto with the drafted message so people can reach out
  // straight from the palette — no backend needed on a static site.
  const sendMessage = useCallback(() => {
    const body = message.trim();
    if (!body) return;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "Hey Chris"
    )}&body=${encodeURIComponent(body)}`;
    setMessage("");
    close();
  }, [message, close]);

  const groups: Group[] = useMemo(() => {
    const goTo = (hash: string) => () => {
      close();
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    };
    const openUrl = (url: string) => () => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    };
    return [
      {
        title: "Pages",
        items: [
          { id: "home", label: "Home", icon: icons.home, run: goTo("#top") },
          { id: "about", label: "About", icon: icons.user, run: goTo("#about") },
          { id: "work", label: "Work", icon: icons.briefcase, run: goTo("#work") },
          { id: "talks", label: "Talks", icon: icons.mic, run: goTo("#talks") },
          { id: "contact", label: "Contact", icon: icons.mail, run: goTo("#contact") },
        ],
      },
      {
        title: "Connect",
        items: [
          {
            id: "reach-out",
            label: "Send a message",
            icon: icons.message,
            run: () => setView("message"),
          },
          {
            id: "github",
            label: "GitHub",
            icon: icons.github,
            external: true,
            run: openUrl(siteConfig.social.github),
          },
          {
            id: "linkedin",
            label: "LinkedIn",
            icon: icons.linkedin,
            external: true,
            run: openUrl(siteConfig.social.linkedin),
          },
          {
            id: "email",
            label: "Send an email",
            icon: icons.mail,
            external: true,
            run: openUrl(`mailto:${siteConfig.email}`),
          },
        ],
      },
      {
        title: "Actions",
        items: [
          {
            id: "copy-email",
            label: copied ? "Email copied" : "Copy email address",
            icon: copied ? icons.check : icons.copy,
            run: () => {
              navigator.clipboard?.writeText(siteConfig.email);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
                close();
              }, 900);
            },
          },
        ],
      },
    ];
  }, [close, copied]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((item) =>
          item.label.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);

  const flat = useMemo(() => filtered.flatMap((g) => g.items), [filtered]);

  // Global shortcut + escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        if (view === "message") {
          setView("search");
        } else {
          close();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, view]);

  // Focus the right field + lock scroll while open
  useEffect(() => {
    if (open) {
      if (view === "message") {
        textareaRef.current?.focus();
      } else {
        inputRef.current?.focus();
      }
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open, view]);

  const select = (item: Command) => {
    remember(item.label);
    item.run();
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(flat.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + Math.max(flat.length, 1)) % Math.max(flat.length, 1));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      select(flat[active]);
    }
  };

  return (
    <>
      {/* Bottom trigger bar */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[var(--panel)] py-2.5 pl-4 pr-2.5 text-[var(--faint-on-panel)] shadow-[0_10px_40px_rgba(19,18,16,0.3)] transition-colors hover:text-[var(--paper-on-panel)] focus-visible:outline-none"
        aria-label="Open command palette"
      >
        {icons.search}
        <span className="text-sm">Search</span>
        <span className="mono-label rounded-lg bg-white/10 px-2 py-1 !text-[0.62rem] text-[var(--faint-on-panel)]">
          ⌘K
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(19,18,16,0.45)] p-4 backdrop-blur-sm sm:p-6"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ y: 48, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 48, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="panel-focus mb-2 w-full max-w-xl overflow-hidden rounded-[1.4rem] bg-[var(--panel)] text-[var(--paper-on-panel)] shadow-[0_24px_80px_rgba(19,18,16,0.5)]"
            >
              {/* Header row */}
              <div className="flex items-center gap-2 p-3">
                {view === "search" ? (
                  <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 px-4 py-2.5 text-[var(--faint-on-panel)] focus-within:border-white/25">
                    {icons.search}
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setActive(0);
                      }}
                      onKeyDown={onInputKeyDown}
                      placeholder="What are you looking for?"
                      className="w-full bg-transparent text-sm text-[var(--paper-on-panel)] outline-none placeholder:text-[var(--faint-on-panel)] focus-visible:outline-none"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setView("search")}
                    className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 px-4 py-2.5 text-left text-sm text-[var(--paper-on-panel)] transition-colors hover:border-white/25"
                  >
                    <span className="text-[var(--faint-on-panel)]">{icons.back}</span>
                    Reach out
                  </button>
                )}
                {view === "search" && (
                  <button
                    type="button"
                    onClick={() => setView("message")}
                    aria-label="Send a message"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-[var(--faint-on-panel)] transition-colors hover:border-white/25 hover:text-[var(--paper-on-panel)]"
                  >
                    {icons.message}
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-[var(--faint-on-panel)] transition-colors hover:border-white/25 hover:text-[var(--paper-on-panel)]"
                >
                  {icons.close}
                </button>
              </div>

              {/* Results */}
              {view === "search" ? (
              <div
                ref={listRef}
                className="max-h-[min(50vh,26rem)] overflow-y-auto px-3 pb-3"
              >
                {recent.length > 0 && !query && (
                  <div className="px-2 pb-2 pt-1">
                    <div className="flex items-center justify-between pb-2">
                      <span className="mono-label !text-[0.62rem] text-[var(--faint-on-panel)]">
                        Recent
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setRecent([]);
                          try {
                            localStorage.removeItem(RECENT_KEY);
                          } catch {
                            // storage unavailable
                          }
                        }}
                        className="mono-label !text-[0.62rem] text-[var(--faint-on-panel)] transition-colors hover:text-[var(--paper-on-panel)]"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recent.map((label) => {
                        const item = groups
                          .flatMap((g) => g.items)
                          .find((i) => i.label === label);
                        if (!item) return null;
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => select(item)}
                            className="rounded-lg border border-dashed border-white/20 px-3 py-1.5 text-xs text-[var(--faint-on-panel)] transition-colors hover:border-white/40 hover:text-[var(--paper-on-panel)]"
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {filtered.map((group) => (
                  <div key={group.title} className="px-2 pt-2">
                    <div className="mono-label pb-2 !text-[0.62rem] text-[var(--faint-on-panel)]">
                      {group.title}
                    </div>
                    <div className="grid grid-cols-1 gap-1 pb-1 sm:grid-cols-2">
                      {group.items.map((item) => {
                        const index = flat.indexOf(item);
                        const isActive = index === active;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => select(item)}
                            onMouseMove={() => setActive(index)}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                              isActive
                                ? "bg-white/10 text-[var(--paper-on-panel)]"
                                : "text-[var(--faint-on-panel)]"
                            }`}
                          >
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                                isActive ? "border-white/25" : "border-white/10"
                              }`}
                            >
                              {item.icon}
                            </span>
                            <span className="flex-1">{item.label}</span>
                            {item.external && (
                              <span className="text-[var(--faint-on-panel)]">
                                {icons.arrow}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {flat.length === 0 && (
                  <div className="px-2 py-8 text-center text-sm text-[var(--faint-on-panel)]">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                )}
              </div>
              ) : (
              <div className="max-h-[min(60vh,30rem)] overflow-y-auto px-3 pb-3">
                {/* Compose */}
                <div className="rounded-2xl border border-white/10 p-4">
                  <p className="pb-3 text-sm font-semibold">Send Chris a message</p>
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    rows={3}
                    placeholder="Hey Chris, I have a project idea..."
                    className="w-full resize-none bg-transparent text-sm text-[var(--paper-on-panel)] outline-none placeholder:text-[var(--faint-on-panel)] focus-visible:outline-none"
                  />
                  <div className="flex items-center justify-between pt-2">
                    <span className="mono-label !text-[0.62rem] text-[var(--faint-on-panel)]">
                      ↵ to continue · ⇧↵ new line
                    </span>
                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="flex items-center gap-2 rounded-xl bg-[var(--paper)] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue {icons.arrow}
                    </button>
                  </div>
                </div>

                {/* Direct channels */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    onClick={close}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 px-4 py-6 text-center transition-colors hover:border-white/25"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
                      {icons.mail}
                    </span>
                    <span className="text-sm font-semibold">Email me</span>
                    <span className="mono-label !text-[0.62rem] text-[var(--faint-on-panel)]">
                      {siteConfig.email}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(siteConfig.email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1200);
                    }}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 px-4 py-6 text-center transition-colors hover:border-white/25"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
                      {copied ? icons.check : icons.copy}
                    </span>
                    <span className="text-sm font-semibold">
                      {copied ? "Copied!" : "Copy address"}
                    </span>
                    <span className="mono-label !text-[0.62rem] text-[var(--faint-on-panel)]">
                      No strings attached
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[var(--faint-on-panel)] transition-colors hover:border-white/25 hover:text-[var(--paper-on-panel)]"
                  >
                    {icons.linkedin} LinkedIn
                  </a>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[var(--faint-on-panel)] transition-colors hover:border-white/25 hover:text-[var(--paper-on-panel)]"
                  >
                    {icons.github} GitHub
                  </a>
                </div>
              </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
