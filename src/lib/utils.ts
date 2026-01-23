import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitize(str: string): string {
  if (!str) return "";
  return str
    .trim()
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .slice(0, 1000); // Limit length
}
