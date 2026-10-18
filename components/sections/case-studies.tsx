"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "../ui/reveal";
import { InvoiceVisual, OpwiVisual, SalmaVisual } from "./project-visuals";

const visuals: Record<CaseStudy["slug"], React.ComponentType> = {
  salma: SalmaVisual,
  invoice: InvoiceVisual,
  opwi: OpwiVisual,
};

const desktopQuery = "(min-width: 1024px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = matchMedia(desktopQuery);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => matchMedia(desktopQuery).matches,
    () => false,
  );
}

/** On desktop the case studies pin and stack like a deck as you scroll; on smaller screens they simply flow. */
export function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="mt-12 space-y-6 lg:space-y-0">
      {caseStudies.map((study, i) => (
        <StackedCard
          key={study.slug}
          study={study}
          index={i}
          total={caseStudies.length}
          progress={scrollYProgress}
          stacked={isDesktop}
        />
      ))}
    </div>
  );
}

function StackedCard({
  study,
  index,
  total,
  progress,
  stacked,
}: {
  study: CaseStudy;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const Visual = visuals[study.slug];
  const flip = index % 2 === 1;
  const isLast = index === total - 1;
  // Each card shrinks and dims slightly as later cards slide over it.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045]);
  const dim = useTransform(progress, [index / total, 1], [0, isLast ? 0 : 0.14]);

  return (
    <div className={cn(stacked && !isLast && "lg:h-[88vh]", stacked && isLast && "lg:pb-4")}>
      <div className={cn(stacked && "lg:sticky")} style={stacked ? { top: 104 + index * 22 } : undefined}>
        <Reveal>
          <motion.article
            style={stacked ? { scale } : undefined}
            className="card group relative grid origin-top overflow-hidden !rounded-[1.75rem] shadow-[0_-24px_60px_-40px_rgb(var(--shadow)/0.45)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgb(var(--shadow)/0.45)] lg:grid-cols-12"
          >
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
              <h3 className="mt-6 font-serif text-[2.1rem] leading-[1.08] text-balance sm:text-[2.5rem]">
                {study.title}
              </h3>
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

            {stacked && (
              <motion.div
                aria-hidden
                style={{ opacity: dim }}
                className="pointer-events-none absolute inset-0 bg-panel"
              />
            )}
          </motion.article>
        </Reveal>
      </div>
    </div>
  );
}
