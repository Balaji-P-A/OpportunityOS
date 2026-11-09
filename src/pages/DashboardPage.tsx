import { ArrowRight, Sparkles, Zap, Network, TrendingUp, AlertTriangle, Layers } from 'lucide-react';
import { currentUser, opportunities } from '@/data/mockData';
import { OpportunityCard } from '@/components/ui/OpportunityCard';
import { useCountUp } from '@/hooks/useAnimations';
import type { PageId, MatchType } from '@/types';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
  onViewOpportunity: (id: string) => void;
  onSave: (id: string) => void;
  savedIds: Set<string>;
}

function KPICard({ icon: Icon, label, value, color, bgColor, delay }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
  bgColor: string;
  delay: number;
}) {
  const animated = useCountUp(value, 600 + delay);
  return (
    <div className="card card-hover p-4 flex items-center gap-3" style={{ animationDelay: `${delay}ms` }}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-mono text-2xl font-bold" style={{ color }}>{animated}</p>
        <p className="text-xs text-surface-500 font-medium">{label}</p>
      </div>
    </div>
  );
}

export function DashboardPage({ onNavigate, onViewOpportunity, onSave, savedIds }: DashboardPageProps) {
  const user = currentUser;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const recommended = opportunities.slice(0, 4);
  const urgentCount = opportunities.filter((o) => o.urgent).length;
  const crossDomainCount = opportunities.filter((o) => o.matchType === 'cross-domain').length;
  const growthCount = opportunities.filter((o) => o.matchType === 'growth').length;

  // Opportunity mix data
  const mixData: { type: MatchType; count: number; color: string; label: string }[] = [
    { type: 'direct', count: opportunities.filter((o) => o.matchType === 'direct').length, color: '#22c55e', label: 'Direct' },
    { type: 'cross-domain', count: crossDomainCount, color: '#8b5cf6', label: 'Cross-Domain' },
    { type: 'growth', count: growthCount, color: '#06b6d4', label: 'Growth' },
  ];
  const totalMix = mixData.reduce((sum, m) => sum + m.count, 0);

  // Profile signals
  const signals = [
    { label: 'AI', strength: 86, color: '#6366f1' },
    { label: 'Product', strength: 78, color: '#8b5cf6' },
    { label: 'Software', strength: 72, color: '#22c55e' },
    { label: 'Business', strength: 58, color: '#f59e0b' },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-surface-900">
          {greeting}, {user.name.split(' ')[0]}.
        </h1>
        <p className="text-sm text-surface-500 mt-1">
          {urgentCount} opportunities need your attention.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard icon={Zap} label="Matches" value={opportunities.length} color="#4f46e5" bgColor="bg-primary-50 text-primary-600" delay={0} />
        <KPICard icon={Network} label="Cross-Domain" value={crossDomainCount} color="#7c3aed" bgColor="bg-secondary-50 text-secondary-600" delay={100} />
        <KPICard icon={TrendingUp} label="Growth" value={growthCount} color="#0891b2" bgColor="bg-accent-50 text-accent-600" delay={200} />
        <KPICard icon={AlertTriangle} label="Urgent" value={urgentCount} color="#dc2626" bgColor="bg-danger-50 text-danger-600" delay={300} />
      </div>

      {/* Recommended Today */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="section-title">Recommended Today</h2>
            <p className="text-xs text-surface-500 mt-0.5">Based on your multidimensional profile</p>
          </div>
          <button onClick={() => onNavigate('discover')} className="btn-ghost text-sm">
            View all
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {recommended.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onView={onViewOpportunity}
              onSave={onSave}
              isSaved={savedIds.has(opp.id)}
            />
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Opportunity Mix */}
        <div className="card p-5">
          <h2 className="section-title mb-4">Your Opportunity Mix</h2>
          <div className="flex items-center gap-6">
            {/* Donut chart */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg width="128" height="128" className="transform -rotate-90">
                {(() => {
                  let cumulative = 0;
                  return mixData.map((item) => {
                    const fraction = item.count / totalMix;
                    const circumference = 2 * Math.PI * 48;
                    const dash = fraction * circumference;
                    const offset = cumulative * circumference;
                    cumulative += fraction;
                    return (
                      <circle
                        key={item.type}
                        cx="64"
                        cy="64"
                        r="48"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="12"
                        strokeDasharray={`${dash} ${circumference - dash}`}
                        strokeDashoffset={-offset}
                        className="transition-all duration-700"
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-2xl font-bold text-surface-900">{totalMix}</span>
                <span className="text-[10px] text-surface-500">total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-2.5">
              {mixData.map((item) => (
                <div key={item.type} className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-surface-700 flex-1">{item.label}</span>
                  <span className="font-mono text-sm font-semibold text-surface-900">{item.count}</span>
                  <span className="font-mono text-xs text-surface-400">{Math.round((item.count / totalMix) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Signals */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Your Profile Signals</h2>
            <button onClick={() => onNavigate('profile')} className="text-xs text-primary-600 font-medium hover:text-primary-700">
              View profile
            </button>
          </div>
          <div className="space-y-3">
            {signals.map((signal) => (
              <div key={signal.label} className="flex items-center gap-3">
                <span className="text-sm font-medium text-surface-700 w-20">{signal.label}</span>
                <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${signal.strength}%`, backgroundColor: signal.color }}
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-surface-600 w-8 text-right">{signal.strength}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-surface-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary-500" />
            <p className="text-xs text-surface-500">Your strongest intersection: AI + Product</p>
          </div>
        </div>
      </div>

      {/* What Am I Missing teaser */}
      <div className="card p-5 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-surface-900 mb-1">What are you overlooking?</h3>
            <p className="text-sm text-surface-600 mb-3">
              Your profile has strong AI and Product dimensions, but you mostly explore Software opportunities. Discover what you might be missing.
            </p>
            <button onClick={() => onNavigate('missing')} className="btn-primary text-sm">
              Explore overlooked opportunities
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
