import { useState } from 'react';
import {
  ArrowLeft, Bookmark, BookmarkCheck, Clock, MapPin, Users, Globe,
  Check, TriangleAlert, TrendingUp, ExternalLink, ChevronDown, Sparkles, Target,
} from 'lucide-react';
import { opportunities } from '@/data/mockData';
import { MatchScore } from '@/components/ui/MatchScore';
import { MatchBadge } from '@/components/ui/MatchBadge';
import { MatchReasonList } from '@/components/ui/MatchReasonList';
import { Accordion } from '@/components/ui/Accordion';
import { getDeadlineUrgency, formatDate } from '@/lib/matchUtils';
import type { PageId } from '@/types';

interface OpportunityDetailPageProps {
  opportunityId: string;
  onBack: () => void;
  onNavigate: (page: PageId) => void;
  onSave: (id: string) => void;
  isSaved: boolean;
}

export function OpportunityDetailPage({ opportunityId, onBack, onSave, isSaved }: OpportunityDetailPageProps) {
  const [applied, setApplied] = useState(false);
  const opportunity = opportunities.find((o) => o.id === opportunityId);

  if (!opportunity) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <button onClick={onBack} className="btn-ghost mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-surface-500">Opportunity not found.</p>
      </div>
    );
  }

  const urgency = getDeadlineUrgency(opportunity.daysLeft);

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      {/* Back */}
      <button onClick={onBack} className="btn-ghost mb-4 -ml-2">
        <ArrowLeft className="w-4 h-4" /> Back to opportunities
      </button>

      {/* Header */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${opportunity.logoColor}15` }}
          >
            <span className="font-heading font-bold text-2xl" style={{ color: opportunity.logoColor }}>
              {opportunity.organization.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-2xl font-bold text-surface-900">{opportunity.title}</h1>
            <p className="text-sm text-surface-500 mt-1">{opportunity.organization}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <MatchBadge type={opportunity.matchType} size="md" />
              {opportunity.domains.map((d) => (
                <span key={d} className="text-xs font-medium text-surface-600 bg-surface-100 px-2 py-1 rounded-md">{d}</span>
              ))}
            </div>
          </div>
          <MatchScore score={opportunity.matchScore} size="lg" showLabel />
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-surface-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-surface-400" />
            <div>
              <p className="text-[10px] text-surface-400 uppercase tracking-wider">Deadline</p>
              <p className={`text-sm font-semibold ${urgency.color}`}>{urgency.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {opportunity.mode === 'online' ? <Globe className="w-4 h-4 text-surface-400" /> : <MapPin className="w-4 h-4 text-surface-400" />}
            <div>
              <p className="text-[10px] text-surface-400 uppercase tracking-wider">Mode</p>
              <p className="text-sm font-semibold text-surface-700 capitalize">{opportunity.mode}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-surface-400" />
            <div>
              <p className="text-[10px] text-surface-400 uppercase tracking-wider">Team</p>
              <p className="text-sm font-semibold text-surface-700">{opportunity.teamSize}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-surface-400" />
            <div>
              <p className="text-[10px] text-surface-400 uppercase tracking-wider">Type</p>
              <p className="text-sm font-semibold text-surface-700 capitalize">{opportunity.matchType.replace('-', ' ')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Match visualization */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <h2 className="section-title">Why You Match</h2>
            </div>

            {/* Matched dimensions */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-success-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Matched Dimensions
              </p>
              <div className="flex flex-wrap gap-2">
                {opportunity.matchReasons.map((reason) => (
                  <span key={reason.label} className="chip bg-success-50 border-success-200 text-success-700">
                    <Check className="w-3 h-3" />
                    {reason.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Growth opportunity */}
            {opportunity.growthDimension && (
              <div className="mb-5 p-4 rounded-xl bg-accent-50 border border-accent-100">
                <p className="text-xs font-semibold text-accent-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Growth Opportunity
                </p>
                <p className="text-sm font-medium text-surface-800">{opportunity.growthDimension}</p>
              </div>
            )}

            {/* Potential gaps */}
            {opportunity.missingReasons.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-warning-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <TriangleAlert className="w-3.5 h-3.5" /> Potential Gaps
                </p>
                <MatchReasonList reasons={opportunity.missingReasons} variant="missing" />
              </div>
            )}
          </div>

          {/* Detailed sections */}
          <Accordion title="Overview" defaultOpen>
            <p className="text-sm text-surface-600 leading-relaxed">{opportunity.description}</p>
          </Accordion>

          <Accordion title="Eligibility">
            <div className="space-y-2">
              {opportunity.eligibility.map((e, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-surface-600">
                  <Check className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                  {e}
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="Required Skills">
            <div className="flex flex-wrap gap-2">
              {opportunity.requiredSkills.map((s) => (
                <span key={s} className="chip bg-primary-50 border-primary-200 text-primary-700">{s}</span>
              ))}
            </div>
          </Accordion>

          <Accordion title="Career Value">
            <p className="text-sm text-surface-600 leading-relaxed">{opportunity.careerValue}</p>
          </Accordion>

          <Accordion title="Source">
            <div className="flex items-center gap-2 text-sm text-surface-600">
              <ExternalLink className="w-4 h-4 text-surface-400" />
              {opportunity.source}
            </div>
          </Accordion>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-20 space-y-4">
            {/* Match breakdown */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-surface-800">Match Breakdown</h3>
                <span className="font-mono text-lg font-bold text-primary-600">{opportunity.matchScore}%</span>
              </div>
              <div className="space-y-2.5">
                {opportunity.matchReasons.map((reason) => (
                  <div key={reason.label} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success-500 flex-shrink-0" />
                    <span className="text-xs text-surface-600 flex-1">{reason.label}</span>
                    <span className="text-xs text-surface-400 capitalize">{reason.category}</span>
                  </div>
                ))}
                {opportunity.missingReasons.map((reason) => (
                  <div key={reason.label} className="flex items-center gap-2">
                    <TriangleAlert className="w-3.5 h-3.5 text-warning-500 flex-shrink-0" />
                    <span className="text-xs text-surface-600 flex-1">{reason.label}</span>
                    <span className="text-xs text-surface-400 capitalize">{reason.category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-surface-100">
              <p className="text-xs text-surface-500 mb-1">Deadline</p>
              <p className="text-sm font-semibold text-surface-800">{formatDate(opportunity.deadline)}</p>
              <p className={`text-xs font-medium ${urgency.color}`}>{urgency.label}</p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-surface-100">
              <button
                onClick={() => setApplied(true)}
                disabled={applied}
                className={applied ? "btn-primary w-full opacity-60 cursor-default" : "btn-primary w-full"}
              >
                {applied ? (
                  <>
                    <Check className="w-4 h-4" /> Applied
                  </>
                ) : (
                  'Apply'
                )}
              </button>
              <button onClick={() => onSave(opportunity.id)} className="btn-secondary w-full">
                {isSaved ? <BookmarkCheck className="w-4 h-4 text-primary-600" /> : <Bookmark className="w-4 h-4" />}
                {isSaved ? 'Saved' : 'Save Opportunity'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
