import { Check, X, TriangleAlert } from 'lucide-react';
import type { MatchReason } from '@/types';

interface MatchReasonListProps {
  reasons: MatchReason[];
  variant?: 'matched' | 'missing';
  compact?: boolean;
}

export function MatchReasonList({ reasons, variant = 'matched', compact = false }: MatchReasonListProps) {
  const isMatched = variant === 'matched';
  const Icon = isMatched ? Check : TriangleAlert;
  const iconColor = isMatched ? 'text-success-600 bg-success-50' : 'text-warning-600 bg-warning-50';

  return (
    <div className="space-y-2">
      {reasons.map((reason, idx) => (
        <div key={idx} className="flex items-start gap-2.5">
          <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${iconColor} mt-0.5`}>
            <Icon className="w-3 h-3" strokeWidth={3} />
          </span>
          <div className="min-w-0">
            <p className={`font-medium text-surface-800 ${compact ? 'text-xs' : 'text-sm'}`}>
              {reason.label}
            </p>
            {reason.detail && !compact && (
              <p className="text-xs text-surface-500 mt-0.5">{reason.detail}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface MatchExplanationProps {
  matchScore: number;
  matchType: MatchType;
  matchedReasons: MatchReason[];
  missingReasons: MatchReason[];
}

import type { MatchType } from '@/types';
import { MatchBadge } from './MatchBadge';

export function MatchExplanation({ matchScore, matchType, matchedReasons, missingReasons }: MatchExplanationProps) {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xl font-bold text-primary-600">{matchScore}%</span>
          <span className="text-sm font-medium text-surface-600">Match</span>
        </div>
        <MatchBadge type={matchType} size="md" />
      </div>

      <div>
        <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Why this matches you</h4>
        <MatchReasonList reasons={matchedReasons} variant="matched" />
      </div>

      {missingReasons.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Missing</h4>
          <MatchReasonList reasons={missingReasons} variant="missing" />
        </div>
      )}
    </div>
  );
}
