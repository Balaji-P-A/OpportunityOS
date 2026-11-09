import { useState, useMemo } from 'react';
import { Bookmark, ArrowDownWideNarrow, ChevronDown } from 'lucide-react';
import { opportunities } from '@/data/mockData';
import { OpportunityListItem } from '@/components/ui/OpportunityListItem';
import { EmptyState } from '@/components/ui/States';
import type { MatchType } from '@/types';

interface SavedPageProps {
  savedIds: Set<string>;
  onViewOpportunity: (id: string) => void;
  onSave: (id: string) => void;
}

type SortKey = 'deadline' | 'match' | 'type';

export function SavedPage({ savedIds, onViewOpportunity, onSave }: SavedPageProps) {
  const [sortBy, setSortBy] = useState<SortKey>('deadline');
  const [filterType, setFilterType] = useState<MatchType | 'all'>('all');

  const saved = useMemo(() => {
    const items = opportunities.filter((o) => savedIds.has(o.id));
    const filtered = filterType === 'all' ? items : items.filter((o) => o.matchType === filterType);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline': return a.daysLeft - b.daysLeft;
        case 'match': return b.matchScore - a.matchScore;
        case 'type': return a.matchType.localeCompare(b.matchType);
      }
    });
  }, [savedIds, sortBy, filterType]);

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-surface-900">Saved Opportunities</h1>
        <p className="text-sm text-surface-500 mt-1">{savedIds.size} opportunit{savedIds.size !== 1 ? 'ies' : 'y'} saved</p>
      </div>

      {saved.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="w-8 h-8 text-surface-300" />}
          title="No saved opportunities yet"
          description="Browse opportunities and save the ones that interest you. They'll appear here for easy access."
        />
      ) : (
        <>
          {/* Controls */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <ArrowDownWideNarrow className="w-4 h-4 text-surface-400" />
              <span className="text-sm text-surface-500">Sort by</span>
            </div>
            <div className="flex items-center gap-1">
              {(['deadline', 'match', 'type'] as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                    sortBy === key ? 'bg-primary-50 text-primary-700' : 'text-surface-500 hover:bg-surface-100'
                  }`}
                >
                  {key === 'deadline' ? 'Deadline' : key === 'match' ? 'Match Score' : 'Type'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 ml-auto">
              {(['all', 'direct', 'cross-domain', 'growth'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                    filterType === type ? 'bg-primary-600 text-white' : 'text-surface-500 hover:bg-surface-100'
                  }`}
                >
                  {type === 'all' ? 'All' : type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {saved.map((opp) => (
              <OpportunityListItem
                key={opp.id}
                opportunity={opp}
                onView={onViewOpportunity}
                onSave={onSave}
                isSaved={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
