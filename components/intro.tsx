"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { ease, INTRO } from "@/lib/utils";

/** A brief branded curtain on first paint: monogram, name, then the page is revealed. */
export function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduced ? 0 : INTRO * 1000 - 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          aria-hidden
          exit={{ y: "-100%", borderBottomLeftRadius: "50% 12%", borderBottomRightRadius: "50% 12%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="intro-fallback fixed inset-0 z-[100] flex flex-col items-center justify-center bg-panel text-panel-fg"
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease }}
            className="grid size-20 place-items-center rounded-full font-serif text-3xl text-gold ring-1 ring-gold/50"
          >
            {profile.initials}
          </motion.span>
          <div className="mt-6 overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="font-serif text-2xl tracking-wide"
            >
              {profile.name}
            </motion.p>
          </div>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTRO - 0.35, ease: "easeInOut" }}
            className="mt-6 h-px w-40 origin-left bg-gold/70"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
