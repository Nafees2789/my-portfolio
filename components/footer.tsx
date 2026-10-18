"use client";

import { motion } from "motion/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/data";
import { ease } from "@/lib/utils";
import { scrollToId } from "./smooth-scroll";

const clockFormat = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

export function Footer() {
  // Clock values are client-only, so they start empty and fill in after hydration.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const time = now ? clockFormat.format(now) : "--:--";
  const year = now?.getFullYear();

  const connect = [
    { label: "GitHub", href: profile.github },
    ...(profile.linkedin ? [{ label: "LinkedIn", href: profile.linkedin }] : []),
    { label: "Email", href: `mailto:${profile.email}` },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line px-6 pt-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <span className="grid size-12 place-items-center rounded-full bg-panel font-serif text-lg text-gold ring-1 ring-gold/40">
              {profile.initials}
            </span>
            <p className="mt-6 max-w-sm font-serif text-3xl leading-tight text-balance">
              Building thoughtful, full-stack products — <em className="text-accent">end to end.</em>
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">Navigate</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className="text-fg-soft transition-colors hover:text-accent"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">Connect</p>
            <ul className="mt-5 space-y-3">
              {connect.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-fg-soft transition-colors hover:text-accent"
                  >
                    {c.label}
                    <ArrowUpRight className="size-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <motion.p
        aria-hidden
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
        className="pointer-events-none mt-16 text-center font-serif text-[15.5vw] leading-[0.85] tracking-[-0.03em] whitespace-nowrap select-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--line-strong), color-mix(in oklab, var(--line-strong) 15%, transparent))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Nafees <em>Ahammed</em>
      </motion.p>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year ?? ""} {profile.name}. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs">
            Bengaluru <span className="text-fg-soft tabular-nums">{time}</span> IST
          </span>
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="group inline-flex items-center gap-2 transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
