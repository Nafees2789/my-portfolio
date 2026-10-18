"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/data";
import { cn, ease, INTRO } from "@/lib/utils";
import { scrollToId } from "./smooth-scroll";
import { ThemeToggle } from "./theme-toggle";
import { openCommandMenu } from "./command-menu";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
      />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: INTRO + 0.1 }}
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-2.5 pl-4 transition-all duration-500",
            scrolled
              ? "border-line bg-bg-elevated/75 shadow-[0_8px_30px_-12px_rgb(var(--shadow)/0.18)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <button
            type="button"
            onClick={() => go("top")}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="grid size-8 place-items-center rounded-full bg-panel font-serif text-[15px] text-gold ring-1 ring-gold/40 transition-transform duration-500 group-hover:rotate-[-8deg]">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.shortName}</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active === item.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-surface"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openCommandMenu}
              className="hidden h-9 items-center gap-2 rounded-full px-3 text-xs text-muted transition-colors hover:bg-surface hover:text-fg sm:flex"
              aria-label="Open command menu"
            >
              <Command className="size-3.5" />
              <span className="font-mono">K</span>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => go("contact")}
              className="ml-1 hidden h-9 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover sm:flex"
            >
              Let&apos;s talk
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-9 place-items-center rounded-full text-fg md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex flex-col bg-bg px-6 pt-6 pb-10 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full bg-surface"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-16 space-y-2">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.05 * i }}
                >
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    className="flex w-full items-baseline gap-4 py-2 text-left font-serif text-5xl"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <p className="mt-auto text-sm text-muted">{profile.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
