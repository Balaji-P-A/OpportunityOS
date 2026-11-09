import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { Opportunity } from '@/types';
import { MatchScore } from './MatchScore';
import { MatchBadge } from './MatchBadge';
import { getDeadlineUrgency } from '@/lib/matchUtils';

interface OpportunityListItemProps {
  opportunity: Opportunity;
  onView: (id: string) => void;
  onSave: (id: string) => void;
  isSaved: boolean;
}

export function OpportunityListItem({ opportunity, onView, onSave, isSaved }: OpportunityListItemProps) {
  const urgency = getDeadlineUrgency(opportunity.daysLeft);

  return (
    <div className="card card-hover p-4 flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${opportunity.logoColor}15` }}
      >
        <span className="font-heading font-bold text-lg" style={{ color: opportunity.logoColor }}>
          {opportunity.organization.charAt(0)}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-surface-900 text-sm truncate">{opportunity.title}</h3>
          <MatchBadge type={opportunity.matchType} size="sm" />
        </div>
        <p className="text-xs text-surface-500">{opportunity.organization}</p>
      </div>

      <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
        {opportunity.domains.slice(0, 2).map((domain) => (
          <span key={domain} className="text-xs font-medium text-surface-600 bg-surface-100 px-2 py-0.5 rounded-md">
            {domain}
          </span>
        ))}
      </div>

      <div className="hidden md:block text-xs text-surface-500 flex-shrink-0 w-20">
        <span className={`font-medium ${urgency.color}`}>{urgency.label}</span>
      </div>

      <div className="flex-shrink-0">
        <MatchScore score={opportunity.matchScore} size="sm" />
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button onClick={() => onView(opportunity.id)} className="btn-secondary text-xs px-3 py-2">
          View
        </button>
        <button
          onClick={() => onSave(opportunity.id)}
          className={`p-2 rounded-lg border transition-all duration-200 ${
            isSaved
              ? 'bg-primary-50 border-primary-200 text-primary-600'
              : 'bg-white border-surface-200 text-surface-400 hover:text-surface-700'
          }`}
          aria-label={isSaved ? 'Unsave' : 'Save'}
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
