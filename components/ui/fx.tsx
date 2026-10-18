"use client";

import { animate, motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

/** One page-wide listener that feeds the cursor position to whichever `.spotlight` card is hovered. */
export function SpotlightTracker() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(".spotlight") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

/** Counts the numeric part of values like "4+" or "1st" up from zero when scrolled into view. */
export function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [, num, suffix] = value.match(/^(\d+)(.*)$/) ?? [null, null, value];

  useEffect(() => {
    if (!inView || num === null || !ref.current) return;
    const el = ref.current;
    const target = Number(num);
    const controls = animate(0, target, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, num, suffix, delay]);

  return <span ref={ref}>{value}</span>;
}

/** Gently pulls its child toward the cursor. */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
