"use client";

import { AnimatePresence, motion } from "motion/react";
import { Calendar, CheckCircle2, MapPin } from "lucide-react";
import { useState } from "react";
import { experiences } from "@/lib/data";
import { cn, ease } from "@/lib/utils";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

export function Experience() {
  const [active, setActive] = useState(0);
  const job = experiences[active];

  return (
    <section id="experience" className="border-y border-line bg-surface/50 px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          label="Experience"
          title={
            <>
              Where I&apos;ve <em className="text-accent">worked.</em>
            </>
          }
          intro="4+ years of building production software — from enterprise delivery to full-stack products in invoicing, data and AI."
        />

        <Reveal className="mt-12 grid gap-4 lg:grid-cols-12">
          <div role="tablist" aria-label="Roles" className="flex flex-col gap-2 lg:col-span-4">
            {experiences.map((e, i) => (
              <button
                key={e.company}
                role="tab"
                type="button"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                  active === i
                    ? "border-gold/50 panel-surface text-panel-fg shadow-[0_16px_40px_-20px_rgb(var(--shadow)/0.6)]"
                    : "border-line bg-bg-elevated hover:border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl font-serif text-[13px] transition-colors",
                    active === i ? "bg-gold text-panel" : "bg-surface text-accent",
                  )}
                >
                  {e.monogram}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{e.company}</span>
                  <span className={cn("mt-0.5 block text-sm", active === i ? "text-panel-muted" : "text-muted")}>
                    {e.role}
                  </span>
                </span>
                <span
                  className={cn(
                    "hidden shrink-0 font-mono text-[11px] sm:block",
                    active === i ? "text-gold" : "text-faint",
                  )}
                >
                  {e.period.split(" — ")[0].split(" ")[1]}
                </span>
              </button>
            ))}
          </div>

          <div className="card spotlight relative min-h-[420px] overflow-hidden p-8 sm:p-10 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={job.company}
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{job.role}</h3>
                    <p className="mt-1 text-lg font-medium text-accent">{job.company}</p>
                  </div>
                  {job.current && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                      <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                      Current role
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-4 text-gold" />
                    {job.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-gold" />
                    {job.location}
                  </span>
                </div>

                <p className="mt-6 border-l-2 border-gold pl-4 text-lg leading-relaxed text-fg-soft text-pretty">
                  {job.summary}
                </p>

                <ul className="mt-6 space-y-3">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-fg-soft">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" />
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
                  {job.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-fg-soft">
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
