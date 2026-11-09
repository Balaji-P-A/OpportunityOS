import { useState } from 'react';
import { Brain, ArrowRight, ArrowLeft, Search, Sparkles, Eye, TrendingUp, Network } from 'lucide-react';
import { whatAmIMissingInsight, overlookedOpportunities } from '@/data/mockData';
import { MatchBadge } from '@/components/ui/MatchBadge';
import { MatchScore } from '@/components/ui/MatchScore';
import { matchTypeConfig, getDeadlineUrgency } from '@/lib/matchUtils';
import type { PageId } from '@/types';

interface MissingPageProps {
  onNavigate: (page: PageId) => void;
  onViewOpportunity: (id: string) => void;
}

export function MissingPage({ onNavigate, onViewOpportunity }: MissingPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const insight = whatAmIMissingInsight;

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-100 text-accent-700 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Signature Feature
        </div>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-surface-900">What are you overlooking?</h1>
        <p className="text-sm text-surface-500 mt-1">We analyzed your profile, interests, activity, and available opportunities.</p>
      </div>

      {/* AI Insight card */}
      <div className="card p-6 lg:p-8 bg-gradient-to-br from-primary-50 via-white to-secondary-50 border-primary-100 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{insight.title}</span>
        </div>
        <p className="text-lg lg:text-xl text-surface-800 font-medium leading-relaxed text-pretty">
          {insight.message}
        </p>
      </div>

      {/* Current vs Hidden dimensions */}
      <div className="grid sm:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-surface-400" />
            <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Current Search Focus</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="chip bg-surface-100 border-surface-200 text-surface-600 text-sm px-3 py-1.5">
              {insight.currentFocus}
            </span>
          </div>
          <div className="mt-4 h-2 bg-surface-100 rounded-full overflow-hidden">
            <div className="h-full bg-surface-400 rounded-full" style={{ width: '85%' }} />
          </div>
          <p className="text-xs text-surface-400 mt-1.5">85% of your browsing activity</p>
        </div>

        <div className="card p-5 border-secondary-200 bg-secondary-50/30">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-secondary-500" />
            <span className="text-xs font-semibold text-secondary-600 uppercase tracking-wider">Hidden Profile Dimensions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {insight.hiddenDimensions.map((dim) => (
              <span key={dim} className="chip bg-white border-secondary-200 text-secondary-700 text-sm px-3 py-1.5">
                {dim}
              </span>
            ))}
          </div>
          <div className="mt-4 h-2 bg-surface-100 rounded-full overflow-hidden">
            <div className="h-full bg-secondary-500 rounded-full" style={{ width: '72%' }} />
          </div>
          <p className="text-xs text-secondary-500 mt-1.5">72% profile strength — underexplored</p>
        </div>
      </div>

      {/* Potentially Overlooked */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="section-title">Potentially Overlooked</h2>
            <p className="text-xs text-surface-500 mt-0.5">Opportunities you may have missed based on your search patterns</p>
          </div>
          <span className="font-mono text-sm font-semibold text-surface-400">{overlookedOpportunities.length} found</span>
        </div>

        <div className="space-y-3">
          {overlookedOpportunities.map((item, idx) => {
            const config = matchTypeConfig[item.matchType];
            const urgency = getDeadlineUrgency(item.daysLeft);
            const expanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="card card-hover overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${0.3 + idx * 0.05}s` }}
              >
                <button
                  onClick={() => setExpandedId(expanded ? null : item.id)}
                  className="w-full p-5 flex items-center gap-4 text-left"
                >
                  <MatchScore score={item.matchScore} size="sm" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-surface-900 truncate">{item.title}</h3>
                      <MatchBadge type={item.matchType} size="sm" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.dimensions.map((d) => (
                        <span key={d} className="text-xs font-medium text-surface-500 bg-surface-50 px-1.5 py-0.5 rounded">{d}</span>
                      ))}
                      <span className="text-xs text-surface-400">·</span>
                      <span className={`text-xs font-medium ${urgency.color}`}>{urgency.label}</span>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 text-surface-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                </button>

                {expanded && (
                  <div className="px-5 pb-5 pt-0 animate-fade-in space-y-4">
                    <div className="pt-4 border-t border-surface-100">
                      <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> Why you may have missed this
                      </p>
                      <p className="text-sm text-surface-600">{item.reasonMissed}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Dimensions that create the match</p>
                      <div className="flex flex-wrap gap-2">
                        {item.dimensions.map((d) => (
                          <span key={d} className="chip bg-secondary-50 border-secondary-200 text-secondary-700">{d}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                      <div>
                        <p className="text-xs text-surface-400">Deadline</p>
                        <p className="text-sm font-semibold text-surface-700">{new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                      <button
                        onClick={() => onViewOpportunity(item.id)}
                        className="btn-primary text-sm"
                      >
                        View Opportunity
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="card p-6 bg-gradient-to-r from-primary-600 to-secondary-600 border-0 text-white text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-8 h-8 mx-auto mb-3 text-white/80" />
        <h3 className="font-heading text-xl font-bold mb-2">Explore 12 overlooked opportunities</h3>
        <p className="text-sm text-white/80 mb-4 max-w-md mx-auto">
          There are more opportunities at the intersection of your hidden dimensions waiting to be discovered.
        </p>
        <button onClick={() => onNavigate('discover')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary-700 font-medium text-sm hover:bg-white/90 transition-colors">
          Explore all opportunities
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Back link */}
      <div className="flex justify-center">
        <button onClick={() => onNavigate('dashboard')} className="btn-ghost text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>
    </div>
  );
}
