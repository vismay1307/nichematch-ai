import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatPercent } from "@/lib/utils";
import { SUB_SCORE_LABELS, type MatchSubScores } from "@/types/matching";

export interface MatchScoreCardProps {
  /** Optional — omit on the marketing page, where no real creator is named. */
  creatorName?: string;
  finalScore: number; // 0–1
  subScores: MatchSubScores;
  /**
   * Marks this render as illustrative (landing page, docs) rather
   * than a live production result. Always pass this explicitly at
   * call sites outside the authenticated app — see Part 22 of the
   * spec ("never imply a real result").
   */
  isPreview?: boolean;
  /** Show raw camelCase field names alongside labels (used on the in-app
   *  Recommendations page as an audit view; omitted on the marketing page). */
  showFieldNames?: boolean;
  className?: string;
}

/**
 * Tier 2 domain component. Renders ONLY what it's given — it never
 * computes a score, never calls tRPC, and never invents a reason.
 * The six rows always render in the same order so a reviewer can
 * compare cards at a glance.
 */
export function MatchScoreCard({
  creatorName,
  finalScore,
  subScores,
  isPreview = false,
  showFieldNames = false,
  className,
}: MatchScoreCardProps) {
  const rows = Object.keys(SUB_SCORE_LABELS) as (keyof MatchSubScores)[];

  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          {creatorName && (
            <p className="text-sm font-medium text-slate-900">{creatorName}</p>
          )}
          <p className="text-xs text-slate-500">AI match score</p>
        </div>
        <div className="flex items-center gap-2">
          {isPreview && (
            <Badge variant="muted">Sample match</Badge>
          )}
          <span className="font-mono text-2xl font-semibold tabular-nums text-indigo-600">
            {formatPercent(finalScore)}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {rows.map((key) => {
          const value = subScores[key];
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="w-36 shrink-0 text-xs text-slate-600">
                {SUB_SCORE_LABELS[key]}
                {showFieldNames && (
                  <span className="ml-1 font-mono text-[10px] text-slate-400">
                    {key}
                  </span>
                )}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${Math.round(value * 100)}%` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right font-mono text-xs tabular-nums text-slate-500">
                {formatPercent(value)}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}