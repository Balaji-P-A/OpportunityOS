import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { opportunities } from '@/data/mockData';
import { OpportunityCard } from '@/components/ui/OpportunityCard';
import { EmptyState } from '@/components/ui/States';
import { matchTypeConfig } from '@/lib/matchUtils';
import type { MatchType, Opportunity } from '@/types';

interface DiscoverPageProps {
  onViewOpportunity: (id: string) => void;
  onSave: (id: string) => void;
  savedIds: Set<string>;
}

type Tab = 'all' | MatchType;

const allDomains = Array.from(new Set(opportunities.flatMap((o) => o.domains))).sort();
const allTypes = Array.from(new Set(opportunities.map((o) => o.organization))).sort();
const allModes = ['online', 'offline', 'hybrid'] as const;

export function DiscoverPage({ onViewOpportunity, onSave, savedIds }: DiscoverPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    domains: [] as string[],
    mode: [] as string[],
    minMatch: 0,
    deadline: 'all' as 'all' | '7' | '14' | '30',
  });

  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      if (activeTab !== 'all' && o.matchType !== activeTab) return false;
      if (filters.domains.length > 0 && !filters.domains.some((d) => o.domains.includes(d))) return false;
      if (filters.mode.length > 0 && !filters.mode.includes(o.mode)) return false;
      if (o.matchScore < filters.minMatch) return false;
      if (filters.deadline !== 'all') {
        const days = parseInt(filters.deadline);
        if (o.daysLeft > days) return false;
      }
      return true;
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [activeTab, filters]);

  const toggleArrayFilter = (key: 'domains' | 'mode', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));
  };

  const activeFilterCount = filters.domains.length + filters.mode.length + (filters.minMatch > 0 ? 1 : 0) + (filters.deadline !== 'all' ? 1 : 0);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: opportunities.length },
    { id: 'direct', label: 'Direct', count: opportunities.filter((o) => o.matchType === 'direct').length },
    { id: 'cross-domain', label: 'Cross-Domain', count: opportunities.filter((o) => o.matchType === 'cross-domain').length },
    { id: 'growth', label: 'Growth', count: opportunities.filter((o) => o.matchType === 'growth').length },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-surface-900">Opportunities for You</h1>
        <p className="text-sm text-surface-500 mt-1">Discover opportunities matched across all your dimensions</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-soft'
                : 'bg-white border border-surface-200 text-surface-600 hover:border-surface-300'
            }`}
          >
            {tab.label}
            <span className={`font-mono text-xs ${activeTab === tab.id ? 'text-primary-200' : 'text-surface-400'}`}>{tab.count}</span>
          </button>
        ))}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ml-auto ${
            showFilters || activeFilterCount > 0
              ? 'bg-primary-50 text-primary-700 border border-primary-200'
              : 'bg-white border border-surface-200 text-surface-600 hover:border-surface-300'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="font-mono text-xs bg-primary-600 text-white px-1.5 rounded-full">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="card p-5 mb-4 animate-fade-in-up">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Domain */}
            <div>
              <label className="label">Domain</label>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                {allDomains.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleArrayFilter('domains', d)}
                    className={`chip text-xs transition-all ${filters.domains.includes(d) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-surface-200 text-surface-600'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div>
              <label className="label">Mode</label>
              <div className="flex flex-wrap gap-1.5">
                {allModes.map((m) => (
                  <button
                    key={m}
                    onClick={() => toggleArrayFilter('mode', m)}
                    className={`chip text-xs capitalize transition-all ${filters.mode.includes(m) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-surface-200 text-surface-600'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Min match */}
            <div>
              <label className="label">Minimum Match</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={filters.minMatch}
                  onChange={(e) => setFilters({ ...filters, minMatch: parseInt(e.target.value) })}
                  className="flex-1 accent-primary-600"
                />
                <span className="font-mono text-sm font-semibold text-primary-600 w-10">{filters.minMatch}%</span>
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="label">Deadline</label>
              <select
                value={filters.deadline}
                onChange={(e) => setFilters({ ...filters, deadline: e.target.value as typeof filters.deadline })}
                className="input"
              >
                <option value="all">Any deadline</option>
                <option value="7">Within 7 days</option>
                <option value="14">Within 14 days</option>
                <option value="30">Within 30 days</option>
              </select>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between">
              <span className="text-xs text-surface-500">{activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active</span>
              <button
                onClick={() => setFilters({ domains: [], mode: [], minMatch: 0, deadline: 'all' })}
                className="text-xs font-medium text-primary-600 hover:text-primary-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {filtered.length > 0 ? (
        <>
          <p className="text-xs text-surface-500 mb-3">{filtered.length} opportunit{filtered.length !== 1 ? 'ies' : 'y'} found</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onView={onViewOpportunity}
                onSave={onSave}
                isSaved={savedIds.has(opp.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={<SlidersHorizontal className="w-8 h-8 text-surface-300" />}
          title="No opportunities match your filters"
          description="Try removing some filters or expanding your search criteria."
          action={
            <button onClick={() => setFilters({ domains: [], mode: [], minMatch: 0, deadline: 'all' })} className="btn-secondary">
              Clear filters
            </button>
          }
        />
      )}
    </div>
  );
}
