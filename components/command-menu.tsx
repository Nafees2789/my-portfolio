"use client";

import { Command } from "cmdk";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Copy, CornerDownLeft, Hash, Mail, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/data";
import { ease } from "@/lib/utils";
import { scrollToId } from "./smooth-scroll";
import { toggleTheme } from "./theme-toggle";
import { GithubIcon, LinkedinIcon } from "./ui/icons";

const OPEN_EVENT = "command-menu:open";

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg-soft data-[selected=true]:bg-surface data-[selected=true]:text-fg";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-faint [&_[cmdk-group-heading]]:uppercase";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  const run = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-bg/60 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-bg-elevated shadow-[0_30px_80px_-20px_rgb(var(--shadow)/0.35)]"
          >
            <Command label="Command menu" loop>
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Hash className="size-4 text-faint" />
                <Command.Input
                  autoFocus
                  placeholder="Jump to a section or run an action…"
                  className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-faint"
                />
                <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">ESC</kbd>
              </div>
              <Command.List data-lenis-prevent className="max-h-[360px] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-8 text-center text-sm text-muted">Nothing found.</Command.Empty>
                <Command.Group heading="Navigate" className={groupClass}>
                  {navItems.map((item) => (
                    <Command.Item key={item.id} onSelect={run(() => scrollToId(item.id))} className={itemClass}>
                      <CornerDownLeft className="size-4 text-faint" />
                      {item.label}
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Actions" className={groupClass}>
                  <Command.Item
                    onSelect={() => {
                      navigator.clipboard.writeText(profile.email);
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                        setOpen(false);
                      }, 900);
                    }}
                    className={itemClass}
                  >
                    <Copy className="size-4 text-faint" />
                    {copied ? "Copied to clipboard" : "Copy email address"}
                  </Command.Item>
                  <Command.Item onSelect={run(() => window.location.assign(`mailto:${profile.email}`))} className={itemClass}>
                    <Mail className="size-4 text-faint" />
                    Send an email
                  </Command.Item>
                  <Command.Item onSelect={run(toggleTheme)} className={itemClass}>
                    <Moon className="size-4 text-faint" />
                    Toggle theme
                  </Command.Item>
                </Command.Group>
                <Command.Group heading="Elsewhere" className={groupClass}>
                  <Command.Item onSelect={run(() => window.open(profile.github, "_blank"))} className={itemClass}>
                    <GithubIcon className="size-4 text-faint" />
                    GitHub
                    <ArrowUpRight className="ml-auto size-4 text-faint" />
                  </Command.Item>
                  {profile.linkedin && (
                    <Command.Item onSelect={run(() => window.open(profile.linkedin, "_blank"))} className={itemClass}>
                      <LinkedinIcon className="size-4 text-faint" />
                      LinkedIn
                      <ArrowUpRight className="ml-auto size-4 text-faint" />
                    </Command.Item>
                  )}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
