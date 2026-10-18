import { GraduationCap, LayoutTemplate, Server, Sparkles } from "lucide-react";
import { aboutText, capabilities, education } from "@/lib/data";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const icons = { layout: LayoutTemplate, server: Server, sparkles: Sparkles } as const;

export function About() {
  return (
    <section id="about" className="px-6 pt-10 pb-20 sm:px-10 sm:pt-14 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          label="About me"
          title={
            <>
              Full-stack, <em className="text-accent">end to end.</em>
            </>
          }
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Reveal className="card spotlight p-8 sm:p-10 lg:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">Who I am</p>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-fg-soft">
              {aboutText.map((p) => (
                <p key={p} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.06} className="card spotlight flex flex-col p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                <GraduationCap className="size-5" />
              </span>
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">Education</p>
            </div>
            <ul className="mt-6 space-y-5">
              {education.map((e) => (
                <li key={e.degree} className="border-l-2 border-gold pl-4">
                  <p className="font-medium leading-snug">{e.degree}</p>
                  <p className="mt-1 text-sm text-muted">{e.school}</p>
                  <p className="mt-1 font-mono text-xs text-faint">{e.period}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          {capabilities.map((c, i) => {
            const Icon = icons[c.icon];
            return (
              <Reveal
                key={c.title}
                delay={0.06 * i}
                className="card spotlight group p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-panel text-gold ring-1 ring-gold/30 transition-transform duration-500 group-hover:rotate-[-6deg]">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-serif text-[1.75rem] leading-tight">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted text-pretty">{c.body}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <li key={t} className="rounded-full bg-surface px-2.5 py-1 text-xs text-fg-soft">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
