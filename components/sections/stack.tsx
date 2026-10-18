import { Award, BadgeCheck, BrainCircuit, Database, GitBranch, Medal, Monitor, Trophy } from "lucide-react";
import { recognition, stack } from "@/lib/data";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const groupIcons: Record<string, typeof Monitor> = {
  Frontend: Monitor,
  Backend: Database,
  "Data & AI": BrainCircuit,
  Workflow: GitBranch,
};
const awardIcons = { trophy: Trophy, medal: Medal, badge: BadgeCheck } as const;

export function Stack() {
  return (
    <section id="stack" className="border-y border-line bg-surface/50 px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          label="Skills"
          title={
            <>
              Tools I use <em className="text-accent">every day.</em>
            </>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((group, i) => {
            const Icon = groupIcons[group.group] ?? Monitor;
            return (
              <Reveal key={group.group} delay={0.05 * i} className="card spotlight p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-panel text-gold ring-1 ring-gold/30">
                    <Icon className="size-[18px]" />
                  </span>
                  <h3 className="font-serif text-2xl">{group.group}</h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-bg px-2.5 py-1.5 text-[13px] text-fg-soft transition-colors hover:border-gold hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-4">
          <div className="relative overflow-hidden rounded-[1.5rem] panel-surface p-7 text-panel-fg sm:p-8">
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="flex items-center gap-3 lg:w-56 lg:shrink-0">
                <Award className="size-6 text-gold" />
                <p className="font-serif text-2xl">Recognition</p>
              </div>
              <ul className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {recognition.map((r) => {
                  const Icon = awardIcons[r.icon];
                  return (
                    <li key={r.detail} className="flex items-center gap-3 rounded-xl border border-panel-line bg-panel-2/60 p-4">
                      <Icon className="size-5 shrink-0 text-gold" />
                      <div>
                        <p className="text-sm leading-tight font-medium">{r.detail}</p>
                        <p className="mt-0.5 text-xs text-panel-muted">{r.title}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
