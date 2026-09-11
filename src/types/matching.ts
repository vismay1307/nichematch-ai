/**
 * Mirrors the CampaignCreator.matchDetails JSON shape from the
 * approved roadmap (Part I, §7 — Match Scoring Methodology). This is
 * the explainability contract: every field a reviewer needs to see
 * *why* a score came out the way it did, not just the final number.
 *
 * Once the matching pipeline (Part I, §6) is implemented, this shape
 * is produced by src/server/services/matching.service.ts and served
 * to the client through the campaign.getRecommendations tRPC
 * procedure — nothing here is invented by the UI layer.
 */
export interface MatchSubScores {
  semanticSimilarity: number; // 0–1, cosine similarity from pgvector retrieval
  audienceFitScore: number; // 0–1, campaign niche/industry overlap
  platformFitScore: number; // 0–1, platform-affinity signal
  engagementScore: number; // 0–1, engagement normalized to follower tier
  followerRangeFit: number; // 0–1, fit inside campaign's requested range
  languageLocationFit: number; // 0–1, language/location constraint fit
}

export const SUB_SCORE_LABELS: Record<keyof MatchSubScores, string> = {
  semanticSimilarity: "Semantic relevance",
  audienceFitScore: "Audience fit",
  platformFitScore: "Platform fit",
  engagementScore: "Engagement",
  followerRangeFit: "Follower fit",
  languageLocationFit: "Language / location fit",
};

export interface MatchDetails {
  finalScore: number; // 0–1
  subScores: MatchSubScores;
  weights?: Partial<Record<keyof MatchSubScores, number>>;
  reasons: string[]; // grounded, Gemini-generated — never hardcoded
  modelVersion?: string; // e.g. "gemini-embedding-001@768d + gemini-2.5-flash-lite"
}