import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatCompactNumber, formatPercent } from "@/lib/utils";
import { PLATFORM_LABELS, type Creator } from "@/types/creator";

export interface CreatorCardProps {
  /** Always a full Creator record — this component never receives
   *  raw name/score literals, only the typed object (Part 22). */
  creator: Creator;
  /** Omit to render the card read-only (e.g. inside a profile page). */
  onInvite?: (creatorId: string) => void;
  className?: string;
}

/**
 * Tier 2 domain component. Identical whether `creator` came from the
 * live seeded database (marketplace, recommendations) or from a
 * small illustrative object on the landing page — the component has
 * no idea which, and that's the point (Part I §5 / Part 22).
 */
export function CreatorCard({ creator, onInvite, className }: CreatorCardProps) {
  const {
    displayName,
    avatarUrl,
    primaryNiche,
    platform,
    followerCount,
    engagementRate,
    location,
    isDemoData,
    matchScore,
  } = creator;

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card interactive className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt=""
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-600">
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-900">{displayName}</p>
            <p className="text-xs text-slate-500">{primaryNiche}</p>
          </div>
        </div>

        {typeof matchScore === "number" && (
          <span className="font-mono text-sm font-semibold tabular-nums text-indigo-600">
            {formatPercent(matchScore)}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
        <Badge variant="primary">{PLATFORM_LABELS[platform]}</Badge>
        <span>{formatCompactNumber(followerCount)} followers</span>
        <span>{formatPercent(engagementRate)} engagement</span>
        {location && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {location}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        {isDemoData ? (
          <Badge variant="muted">Demo data</Badge>
        ) : (
          <span />
        )}
        {onInvite && (
          <Button size="sm" variant="outline" onClick={() => onInvite(creator.id)}>
            Invite
          </Button>
        )}
      </div>
    </Card>
  );
}