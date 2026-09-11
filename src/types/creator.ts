/**
 * UI-facing shape of a creator + their primary platform stats, for
 * marketplace/recommendation cards. This is intentionally a *view*
 * type, not the raw Drizzle Creator/CreatorPlatform tables (Part I,
 * §8) — once the schema lands, a small mapping function in
 * src/server/api/creator.ts will project the DB rows into this shape
 * before sending them to the client.
 */
export type Platform = "LINKEDIN" | "X" | "INSTAGRAM";

export interface Creator {
  id: string;
  displayName: string;
  avatarUrl?: string;
  primaryNiche: string;
  platform: Platform;
  followerCount: number;
  engagementRate: number; // 0–1
  location?: string;
  isDemoData?: boolean;
  /** Present only when the card is rendered inside a campaign context. */
  matchScore?: number; // 0–1
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  LINKEDIN: "LinkedIn",
  X: "X",
  INSTAGRAM: "Instagram",
};