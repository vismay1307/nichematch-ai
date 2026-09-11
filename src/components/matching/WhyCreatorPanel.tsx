"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WhyCreatorPanelProps {
  /**
   * Grounded, Gemini-generated reasons (Part I, §6, Stage 3). This
   * component never generates or edits this text — it only displays
   * whatever the matching service produced.
   */
  reasons: string[];
  /** e.g. "gemini-embedding-001@768d + gemini-2.5-flash-lite" — shown
   *  in-app for auditability, omitted on the marketing page. */
  modelVersion?: string;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Tier 2 domain component. Self-contained disclosure — holds its own
 * open/closed state since no other component needs to know it. If a
 * future screen needs controlled state (e.g. "expand all"), lift this
 * to props (open/onOpenChange) rather than forking the component.
 */
export function WhyCreatorPanel({
  reasons,
  modelVersion,
  defaultOpen = false,
  className,
}: WhyCreatorPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (reasons.length === 0) return null;

  return (
    <div className={cn("border-t border-slate-100 pt-3", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left text-sm font-medium text-slate-900"
      >
        Why this creator?
        <ChevronDown
          className={cn("h-4 w-4 text-slate-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          <ul className="space-y-1.5">
            {reasons.map((reason, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                {reason}
              </li>
            ))}
          </ul>
          {modelVersion && (
            <p className="font-mono text-[11px] text-slate-400">{modelVersion}</p>
          )}
        </div>
      )}
    </div>
  );
}