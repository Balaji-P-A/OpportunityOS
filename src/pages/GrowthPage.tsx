import { useState } from 'react';
import { ArrowRight, ArrowDown, Check, Target, TrendingUp, Sparkles, Briefcase, X, Star } from 'lucide-react';
import { growthPath, opportunities } from '@/data/mockData';
import { StrengthBar } from '@/components/ui/StrengthBar';
import type { GrowthNode, PageId } from '@/types';

interface GrowthPageProps {
  onNavigate: (page: PageId) => void;
  onViewOpportunity: (id: string) => void;
}

const nodeTypeConfig: Record<string, { color: string; bg: string; label: string }> = {
  current: { color: '#22c55e', bg: 'bg-success-50', label: 'Current' },
  opportunity: { color: '#6366f1', bg: 'bg-primary-50', label: 'Growth Opportunity' },
  milestone: { color: '#f59e0b', bg: 'bg-warning-50', label: 'Milestone' },
  goal: { color: '#ec4899', bg: 'bg-secondary-50', label: 'Goal' },
};

export function GrowthPage({ onNavigate, onViewOpportunity }: GrowthPageProps) {
  const [selectedNode, setSelectedNode] = useState<GrowthNode | null>(null);

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-surface-900">Where can you go next?</h1>
        <p className="text-sm text-surface-500 mt-1">
          Your career progression from <span className="font-semibold text-surface-700">{growthPath.nodes[0].label}</span> to{' '}
          <span className="font-semibold text-secondary-700">{growthPath.nodes[growthPath.nodes.length - 1].label}</span>
        </p>
      </div>

      {/* Career path visualization */}
      <div className="card p-6 lg:p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col items-center gap-2">
          {growthPath.nodes.map((node, idx) => {
            const config = nodeTypeConfig[node.type];
            const isLast = idx === growthPath.nodes.length - 1;
            const isSelected = selectedNode?.id === node.id;

            return (
              <div key={node.id} className="flex flex-col items-center w-full max-w-md">
                <button
                  onClick={() => setSelectedNode(isSelected ? null : node)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                    isSelected ? 'border-primary-400 shadow-glow' : 'border-surface-200'
                  } ${config.bg}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                      style={{ backgroundColor: config.color }}
                    >
                      {node.type === 'current' ? <Check className="w-5 h-5" /> :
                       node.type === 'goal' ? <Target className="w-5 h-5" /> :
                       node.type === 'milestone' ? <Star className="w-5 h-5" /> :
                       <TrendingUp className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: config.color }}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm font-heading font-semibold text-surface-900 mt-0.5">{node.label}</p>
                      {node.type !== 'current' && node.type !== 'goal' && (
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs text-surface-500">Fit: <span className="font-mono font-semibold" style={{ color: config.color }}>{node.currentFit}%</span></span>
                          <span className="text-xs text-surface-500">Goal: <span className="font-mono font-semibold" style={{ color: config.color }}>{node.goalAlignment}%</span></span>
                        </div>
                      )}
                    </div>
                    {node.opportunityId && (
                      <ArrowRight className="w-4 h-4 text-surface-400" />
                    )}
                  </div>
                </button>

                {!isLast && (
                  <div className="flex flex-col items-center py-1">
                    <ArrowDown className="w-5 h-5 text-surface-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected node detail */}
      {selectedNode && (
        <div className="card p-6 animate-slide-in-right">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: nodeTypeConfig[selectedNode.type].color }}>
                {nodeTypeConfig[selectedNode.type].label}
              </span>
            </div>
            <button onClick={() => setSelectedNode(null)} className="p-1 rounded-lg hover:bg-surface-100">
              <X className="w-4 h-4 text-surface-400" />
            </button>
          </div>

          <h2 className="font-heading text-xl font-bold text-surface-900 mb-4">{selectedNode.label}</h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Current Fit</p>
              <StrengthBar value={selectedNode.currentFit} animate={false} />
            </div>
            <div>
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Goal Alignment</p>
              <StrengthBar value={selectedNode.goalAlignment} animate={false} color="bg-secondary-500" />
            </div>
          </div>

          {selectedNode.skillsGained.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Skills Gained</p>
              <div className="flex flex-wrap gap-2">
                {selectedNode.skillsGained.map((skill) => (
                  <span key={skill} className="chip bg-primary-50 border-primary-200 text-primary-700">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {selectedNode.experienceGained.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Experience Gained</p>
              <div className="space-y-1.5">
                {selectedNode.experienceGained.map((exp, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-surface-600">
                    <Check className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                    {exp}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedNode.opportunityId && (
            <button
              onClick={() => onViewOpportunity(selectedNode.opportunityId!)}
              className="btn-primary w-full"
            >
              Explore Growth Path
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Growth opportunities */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="section-title mb-4">Growth Opportunities</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {opportunities.filter((o) => o.matchType === 'growth').map((opp) => (
            <div key={opp.id} className="card card-hover p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-accent-600 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Growth Opportunity
                </span>
              </div>
              <h3 className="font-heading font-semibold text-surface-900 mb-1">{opp.title}</h3>
              <p className="text-xs text-surface-500 mb-3">{opp.organization}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-surface-400 uppercase tracking-wider mb-1">Current Fit</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${opp.matchScore - 10}%` }} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-primary-600">{opp.matchScore - 10}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-surface-400 uppercase tracking-wider mb-1">Goal Alignment</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary-500 rounded-full" style={{ width: `${opp.matchScore}%` }} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-secondary-600">{opp.matchScore}%</span>
                  </div>
                </div>
              </div>

              {opp.growthDimension && (
                <div className="mb-3">
                  <p className="text-[10px] text-surface-400 uppercase tracking-wider mb-1.5">Builds</p>
                  <p className="text-sm text-surface-700 font-medium">{opp.growthDimension}</p>
                </div>
              )}

              <button
                onClick={() => onViewOpportunity(opp.id)}
                className="btn-secondary w-full text-sm"
              >
                Explore Growth Path
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
