import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ease = [0.22, 1, 0.36, 1] as const;

// Seconds the intro curtain covers the page; hero entrances wait for it.
export const INTRO = 1.25;
