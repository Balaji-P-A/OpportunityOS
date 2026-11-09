import type { MatchType } from '@/types';
import { matchTypeConfig } from '@/lib/matchUtils';

interface MatchBadgeProps {
  type: MatchType;
  size?: 'sm' | 'md';
}

export function MatchBadge({ type, size = 'sm' }: MatchBadgeProps) {
  const config = matchTypeConfig[type];
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
