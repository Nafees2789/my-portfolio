"use client";

import { CheckCircle2 } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "../ui/reveal";
import { InvoiceVisual, OpwiVisual, SalmaVisual } from "./project-visuals";

const visuals: Record<CaseStudy["slug"], React.ComponentType> = {
  salma: SalmaVisual,
  invoice: InvoiceVisual,
  opwi: OpwiVisual,
};

export function CaseStudies() {
  return (
    <div className="mt-12 space-y-6 lg:space-y-8">
      {caseStudies.map((study, i) => (
        <CaseStudyCard key={study.slug} study={study} index={i} total={caseStudies.length} />
      ))}
    </div>
  );
}

function CaseStudyCard({ study, index, total }: { study: CaseStudy; index: number; total: number }) {
  const Visual = visuals[study.slug];
  const flip = index % 2 === 1;

  return (
    <Reveal>
      <article className="card group relative grid overflow-hidden !rounded-[1.75rem] transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgb(var(--shadow)/0.45)] lg:grid-cols-12">
        <div
          className={cn(
            "panel-surface relative flex min-h-[380px] items-center justify-center overflow-hidden p-6 sm:p-10 lg:col-span-7",
            flip && "lg:order-2",
          )}
        >
          <div aria-hidden className="panel-grid absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-35"
            style={{ background: "var(--gold)" }}
          />
          <span className="absolute top-5 left-6 font-mono text-[11px] tracking-[0.16em] text-panel-muted uppercase">
            {study.kicker}
          </span>
          <div className="relative mt-6 h-[340px] w-full max-w-[520px] transition-transform duration-700 ease-out group-hover:-translate-y-1.5 sm:h-[370px]">
            <Visual />
          </div>
        </div>

        <div className="flex flex-col p-8 sm:p-10 lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-panel font-mono text-xs text-gold ring-1 ring-gold/30">
              0{index + 1}
            </span>
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[11px] text-faint">
              0{index + 1} / 0{total}
            </span>
          </div>
          <h3 className="mt-6 font-serif text-[2.1rem] leading-[1.08] text-balance sm:text-[2.5rem]">{study.title}</h3>
          <p className="mt-4 leading-relaxed text-muted text-pretty">{study.description}</p>

          <p className="mt-7 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">Key contributions</p>
          <ul className="mt-3 space-y-2.5">
            {study.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg-soft">
                <CheckCircle2 className="mt-[3px] size-4 shrink-0 text-accent" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">Tech stack</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line-strong bg-bg px-3 py-1 text-xs font-medium text-fg-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
