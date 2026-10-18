"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { coreStack, heroIntro, heroRoles, profile, profileCard, stats } from "@/lib/data";
import { ease, INTRO } from "@/lib/utils";
import { scrollToId } from "../smooth-scroll";
import { CountUp, Magnetic } from "../ui/fx";
import { GithubIcon, LinkedinIcon } from "../ui/icons";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease, delay: INTRO + delay },
});

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-6 pt-32 pb-10 sm:px-10 sm:pt-36 sm:pb-14">
      <div aria-hidden className="hairline-grid absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute -top-48 right-[-12%] size-[720px] animate-drift-a rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 65%)" }}
        />
        <div
          className="absolute top-[30%] left-[-15%] size-[560px] animate-drift-b rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 30%, transparent), transparent 65%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-elevated/80 py-1.5 pr-4 pl-3 text-xs font-medium text-fg-soft backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-soft rounded-full bg-gold" />
              <span className="relative size-2 rounded-full bg-gold" />
            </span>
            Open to new opportunities
          </motion.span>

          <motion.p {...fadeUp(0.1)} className="mt-8 text-lg text-muted">
            Hello, I&apos;m
          </motion.p>
          <h1 className="mt-2 font-serif text-[clamp(3.1rem,7.2vw,6.25rem)] leading-[0.95] tracking-[-0.02em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay: INTRO + 0.15 }}
              >
                Shaik Nafees
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.em
                className="block pl-[0.04em] text-accent"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay: INTRO + 0.27 }}
              >
                Ahammed
              </motion.em>
            </span>
          </h1>

          <motion.div {...fadeUp(0.45)} className="mt-6 flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            <RotatingRole />
          </motion.div>

          <motion.p {...fadeUp(0.55)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            {heroIntro}
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToId("work")}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent pr-5 pl-6 text-sm font-medium text-accent-fg shadow-[0_14px_34px_-12px_rgb(var(--shadow)/0.55)] transition-colors hover:bg-accent-hover"
              >
                View my work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="inline-flex h-12 items-center rounded-full border border-line-strong bg-bg-elevated px-6 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Contact me
            </button>
            <div className="ml-1 flex items-center gap-1">
              <IconLink href={profile.github} label="GitHub">
                <GithubIcon className="size-[18px]" />
              </IconLink>
              {profile.linkedin && (
                <IconLink href={profile.linkedin} label="LinkedIn">
                  <LinkedinIcon className="size-[18px]" />
                </IconLink>
              )}
              <IconLink href={`mailto:${profile.email}`} label="Email">
                <Mail className="size-[18px]" />
              </IconLink>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.2, ease, delay: INTRO + 0.35 }}
          className="lg:col-span-5"
        >
          <TiltCard>
            <ProfileCard />
          </TiltCard>
        </motion.div>
      </div>

      <dl className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            {...fadeUp(0.8 + i * 0.08)}
            className="card spotlight flex items-center gap-4 !rounded-2xl px-5 py-5"
          >
            <dd className="font-serif text-4xl leading-none text-accent tabular-nums sm:text-5xl">
              <CountUp value={s.value} delay={INTRO + 0.9 + i * 0.08} />
            </dd>
            <dt className="text-sm leading-snug text-muted">{s.label}</dt>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % heroRoles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-8 overflow-hidden text-xl font-medium sm:text-2xl">
      {/* Invisible longest title reserves the width so nothing beside it shifts. */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {heroRoles.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={heroRoles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="absolute inset-0 whitespace-nowrap"
        >
          {heroRoles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      {children}
    </a>
  );
}

/** Tilts toward the cursor in 3D and sweeps a soft sheen across the surface. */
function TiltCard({ children }: { children: React.ReactNode }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const rotateX = useTransform(sy, [0, 1], [7, -7]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgb(255 255 255 / 0.14), transparent 55%)`;

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        className="relative rounded-[1.75rem]"
      >
        {children}
        <motion.div
          aria-hidden
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] mix-blend-overlay"
        />
      </motion.div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="panel-surface relative overflow-hidden rounded-[1.75rem] p-7 text-panel-fg shadow-[0_50px_90px_-40px_rgb(var(--shadow)/0.65)] sm:p-8">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-64 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gold)" }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-panel-2 font-serif text-2xl text-gold ring-2 ring-gold/70 ring-offset-4 ring-offset-panel">
              {profile.initials}
            </span>
            <div>
              <p className="font-serif text-2xl leading-tight">{profile.shortName}</p>
              <p className="mt-0.5 text-sm text-panel-muted">{profile.role}</p>
            </div>
          </div>
          <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-gold uppercase">
            Available
          </span>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-panel-line pt-6">
          {profileCard.map((row) => (
            <div key={row.label}>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-panel-muted uppercase">{row.label}</dt>
              <dd className="mt-1.5 text-[15px] leading-snug">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 border-t border-panel-line pt-6">
          <p className="font-mono text-[10px] tracking-[0.16em] text-panel-muted uppercase">Core stack</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {coreStack.map((tech, i) => (
              <li
                key={tech}
                className={
                  i < 6
                    ? "rounded-full bg-gold px-3 py-1 text-xs font-medium text-panel"
                    : "rounded-full border border-panel-line px-3 py-1 text-xs text-panel-fg"
                }
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-7 flex items-center gap-2 text-xs text-panel-muted">
          <MapPin className="size-3.5 text-gold" />
          {profile.location}
        </p>
      </div>
    </div>
  );
}
