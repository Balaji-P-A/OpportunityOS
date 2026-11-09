import { Bookmark, BookmarkCheck, Clock, MapPin, Users, Globe } from 'lucide-react';
import type { Opportunity } from '@/types';
import { MatchScore } from './MatchScore';
import { MatchBadge } from './MatchBadge';
import { MatchReasonList } from './MatchReasonList';
import { getDeadlineUrgency } from '@/lib/matchUtils';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onView: (id: string) => void;
  onSave: (id: string) => void;
  isSaved: boolean;
  compact?: boolean;
}

export function OpportunityCard({ opportunity, onView, onSave, isSaved, compact = false }: OpportunityCardProps) {
  const urgency = getDeadlineUrgency(opportunity.daysLeft);
  const matchedReasons = opportunity.matchReasons.slice(0, compact ? 3 : 4);

  return (
    <div className="card card-hover p-5 flex flex-col gap-4 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${opportunity.logoColor}15` }}
          >
            <span className="font-heading font-bold text-lg" style={{ color: opportunity.logoColor }}>
              {opportunity.organization.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-surface-900 leading-tight truncate">
              {opportunity.title}
            </h3>
            <p className="text-xs text-surface-500 mt-0.5">{opportunity.organization}</p>
          </div>
        </div>
        <MatchScore score={opportunity.matchScore} size="sm" />
      </div>

      {/* Match badge + domains */}
      <div className="flex items-center gap-2 flex-wrap">
        <MatchBadge type={opportunity.matchType} />
        <span className="text-xs text-surface-400">·</span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {opportunity.domains.map((domain) => (
            <span key={domain} className="text-xs font-medium text-surface-600 bg-surface-100 px-2 py-0.5 rounded-md">
              {domain}
            </span>
          ))}
        </div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-surface-500">
        <span className={`flex items-center gap-1 font-medium ${urgency.color}`}>
          <Clock className="w-3.5 h-3.5" />
          {urgency.label}
        </span>
        <span className="flex items-center gap-1">
          {opportunity.mode === 'online' ? <Globe className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
          {opportunity.mode === 'online' ? 'Online' : opportunity.mode === 'offline' ? 'Offline' : 'Hybrid'}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          Team {opportunity.teamSize}
        </span>
      </div>

      {/* Why you match */}
      <div className="pt-3 border-t border-surface-100">
        <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2.5">Why you match</p>
        <MatchReasonList reasons={matchedReasons} variant="matched" compact />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-surface-100">
        <button onClick={() => onView(opportunity.id)} className="btn-primary flex-1 text-xs">
          View Opportunity
        </button>
        <button
          onClick={() => onSave(opportunity.id)}
          className={`p-2.5 rounded-xl border transition-all duration-200 ${
            isSaved
              ? 'bg-primary-50 border-primary-200 text-primary-600'
              : 'bg-white border-surface-200 text-surface-500 hover:border-surface-300 hover:text-surface-700'
          }`}
          aria-label={isSaved ? 'Unsave opportunity' : 'Save opportunity'}
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
