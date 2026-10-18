"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle colour theme"
      className={cn(
        "relative grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg",
        className,
      )}
    >
      <Sun className="size-[17px] scale-100 rotate-0 transition-transform duration-500 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[17px] scale-0 rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0" />
    </button>
  );
}
