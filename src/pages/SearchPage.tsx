import { useState, useMemo } from 'react';
import { Search, ArrowRight, Sparkles, X, Filter } from 'lucide-react';
import { opportunities } from '@/data/mockData';
import { OpportunityCard } from '@/components/ui/OpportunityCard';
import { EmptyState } from '@/components/ui/States';

interface SearchPageProps {
  onViewOpportunity: (id: string) => void;
  onSave: (id: string) => void;
  savedIds: Set<string>;
  onNavigateToAssistant: () => void;
}

const exampleQueries = [
  'Find online AI opportunities that help me move toward product management',
  'Hackathons for Python and React developers',
  'Cross-domain opportunities in AI and business',
  'Growth opportunities for aspiring product managers',
];

const keywordMap: Record<string, (q: string) => boolean> = {
  'AI': (q) => /\bai\b|machine learning|ml\b/i.test(q),
  'Product': (q) => /product/i.test(q),
  'Online': (q) => /online/i.test(q),
  'Offline': (q) => /offline/i.test(q),
  'Hybrid': (q) => /hybrid/i.test(q),
  'Growth': (q) => /growth|career|toward|move to/i.test(q),
  'Software': (q) => /software|developer|coding|programming/i.test(q),
  'Hackathon': (q) => /hackathon/i.test(q),
  'Research': (q) => /research/i.test(q),
  'Startups': (q) => /startup|entrepreneur/i.test(q),
  'Analytics': (q) => /analytics|data/i.test(q),
  'Business': (q) => /business|strategy/i.test(q),
  'Design': (q) => /design|ui|ux/i.test(q),
  'Cybersecurity': (q) => /cyber|security|ctf/i.test(q),
};

export function SearchPage({ onViewOpportunity, onSave, savedIds, onNavigateToAssistant }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const interpretedFilters = useMemo(() => {
    if (!query.trim()) return [];
    return Object.entries(keywordMap)
      .filter(([, test]) => test(query))
      .map(([label]) => label);
  }, [query]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const filters = interpretedFilters;

    return opportunities.filter((o) => {
      if (filters.length === 0) return true;

      let matches = 0;
      for (const f of filters) {
        if (o.domains.some((d) => d.toLowerCase().includes(f.toLowerCase()))) matches++;
        else if (f === 'Online' && o.mode === 'online') matches++;
        else if (f === 'Offline' && o.mode === 'offline') matches++;
        else if (f === 'Hybrid' && o.mode === 'hybrid') matches++;
        else if (f === 'Growth' && o.matchType === 'growth') matches++;
        else if (f === 'Hackathon' && o.title.toLowerCase().includes('hackathon')) matches++;
        else if (f === 'Research' && o.domains.includes('Research')) matches++;
        else if (o.requiredSkills.some((s) => s.toLowerCase().includes(f.toLowerCase()))) matches++;
      }
      return matches > 0;
    }).sort((a, b) => {
      const aMatches = filters.filter((f) =>
        a.domains.some((d) => d.toLowerCase().includes(f.toLowerCase())) ||
        (f === 'Online' && a.mode === 'online') ||
        (f === 'Growth' && a.matchType === 'growth')
      ).length;
      const bMatches = filters.filter((f) =>
        b.domains.some((d) => d.toLowerCase().includes(f.toLowerCase())) ||
        (f === 'Online' && b.mode === 'online') ||
        (f === 'Growth' && b.matchType === 'growth')
      ).length;
      return bMatches - aMatches || b.matchScore - a.matchScore;
    });
  }, [query, interpretedFilters]);

  const handleSearch = (q?: string) => {
    if (q !== undefined) setQuery(q);
    setSearched(true);
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-surface-900">Intelligent Search</h1>
        <p className="text-sm text-surface-500 mt-1">Search in natural language — we'll interpret your intent into filters</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Find opportunities that match my skills and career goals..."
          className="input pl-12 pr-32 py-3.5 text-base"
        />
        <button
          onClick={() => handleSearch()}
          className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary text-sm px-4 py-2"
        >
          Search
        </button>
      </div>

      {/* Example queries */}
      {!searched && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Try these examples</p>
          <div className="space-y-2">
            {exampleQueries.map((ex) => (
              <button
                key={ex}
                onClick={() => { setQuery(ex); handleSearch(ex); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-surface-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all text-left group"
              >
                <Search className="w-4 h-4 text-surface-400 group-hover:text-primary-500" />
                <span className="text-sm text-surface-600 flex-1">{ex}</span>
                <ArrowRight className="w-4 h-4 text-surface-300 group-hover:text-primary-500" />
              </button>
            ))}
          </div>

          {/* AI Assistant suggestion */}
          <button
            onClick={onNavigateToAssistant}
            className="w-full mt-4 flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 hover:shadow-card transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-surface-900">Ask the AI Assistant</p>
              <p className="text-xs text-surface-500">Get personalized recommendations with a conversational AI</p>
            </div>
            <ArrowRight className="w-4 h-4 text-primary-500" />
          </button>
        </div>
      )}

      {/* Interpreted filters */}
      {searched && interpretedFilters.length > 0 && (
        <div className="mb-4 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Interpreted Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {interpretedFilters.map((f) => (
              <span key={f} className="chip bg-primary-50 border-primary-200 text-primary-700 animate-scale-in">
                <Sparkles className="w-3 h-3" />
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {searched && (
        <div className="animate-fade-in-up">
          {results.length > 0 ? (
            <>
              <p className="text-xs text-surface-500 mb-3">{results.length} opportunit{results.length !== 1 ? 'ies' : 'y'} found</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((opp) => (
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
              icon={<Search className="w-8 h-8 text-surface-300" />}
              title="No results found"
              description="Try a different search query or use simpler keywords."
              action={
                <button onClick={() => { setQuery(''); setSearched(false); }} className="btn-secondary">
                  Start over
                </button>
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
