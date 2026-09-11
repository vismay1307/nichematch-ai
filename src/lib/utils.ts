import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely (later classes override earlier
 * conflicting ones). Used by every component below instead of raw
 * string concatenation.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 45200 -> "45.2K", 1200000 -> "1.2M". Used for follower counts and
 * other large numeric fields anywhere in the product.
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * 0.912 -> "91%". All match sub-scores and engagement rates are
 * stored as 0–1 floats in the database; this is the single place
 * that turns them into display text.
 */
export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}