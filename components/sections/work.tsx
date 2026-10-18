import { ArrowUpRight } from "lucide-react";
import { builds, profile } from "@/lib/data";
import { GithubIcon } from "../ui/icons";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { CaseStudies } from "./case-studies";

export function Work() {
  return (
    <section id="work" className="px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          label="Selected work"
          title={
            <>
              Products built for <em className="text-accent">real</em> teams.
            </>
          }
          intro="Enterprise products I've engineered — high-volume invoicing, precision data visualisation and AI assistants."
        />

        <CaseStudies />

        <div className="mt-24">
          <SectionHeading
            index="03.1"
            label="Open source"
            title={
              <>
                Full-stack builds <em className="text-accent">on GitHub.</em>
              </>
            }
            action={
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-bg-elevated px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon className="size-4" />
                View all repositories
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            }
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {builds.map((build, i) => (
              <Reveal key={build.title} delay={0.05 * (i % 2)} className="h-full">
                <a
                  href={build.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card spotlight group flex h-full flex-col p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-panel text-gold ring-1 ring-gold/30">
                        <GithubIcon className="size-5" />
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{build.kicker}</span>
                    </span>
                    <ArrowUpRight className="size-5 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </div>
                  <h4 className="mt-6 font-serif text-[1.75rem] leading-tight">{build.title}</h4>
                  <p className="mt-2 leading-relaxed text-muted text-pretty">{build.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {build.stack.map((t) => (
                      <li key={t} className="rounded-full bg-surface px-2.5 py-1 text-xs text-fg-soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
