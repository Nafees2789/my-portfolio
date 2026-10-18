import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  label,
  title,
  intro,
  action,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          <span className="font-semibold text-accent">{index}</span>
          <span className="size-1 rounded-full bg-gold" />
          {label}
        </p>
        <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-balance sm:text-5xl">{title}</h2>
        {intro && <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}
