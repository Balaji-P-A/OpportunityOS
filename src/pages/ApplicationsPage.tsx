import { useState, useMemo } from 'react';
import { ClipboardList, GripVertical, Clock } from 'lucide-react';
import { initialApplications, opportunities } from '@/data/mockData';
import { MatchBadge } from '@/components/ui/MatchBadge';
import { getDeadlineUrgency } from '@/lib/matchUtils';
import type { ApplicationItem, ApplicationStage } from '@/types';

interface ApplicationsPageProps {
  onViewOpportunity: (id: string) => void;
}

const stages: { id: ApplicationStage; label: string; color: string }[] = [
  { id: 'saved', label: 'Saved', color: 'bg-surface-100' },
  { id: 'planning', label: 'Planning', color: 'bg-primary-100' },
  { id: 'applied', label: 'Applied', color: 'bg-accent-100' },
  { id: 'shortlisted', label: 'Shortlisted', color: 'bg-warning-100' },
  { id: 'interview', label: 'Interview', color: 'bg-secondary-100' },
  { id: 'selected', label: 'Selected', color: 'bg-success-100' },
];

export function ApplicationsPage({ onViewOpportunity }: ApplicationsPageProps) {
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<ApplicationStage | null>(null);

  const grouped = useMemo(() => {
    const result: Record<ApplicationStage, ApplicationItem[]> = {
      saved: [], planning: [], applied: [], shortlisted: [], interview: [], selected: [],
    };
    for (const app of applications) {
      result[app.stage].push(app);
    }
    return result;
  }, [applications]);

  const handleDrop = (stage: ApplicationStage) => {
    if (!draggedId) return;
    setApplications((prev) => prev.map((a) => a.id === draggedId ? { ...a, stage } : a));
    setDraggedId(null);
    setDragOverStage(null);
  };

  const handleStageClick = (appId: string, currentStage: ApplicationStage) => {
    const stageOrder: ApplicationStage[] = ['saved', 'planning', 'applied', 'shortlisted', 'interview', 'selected'];
    const currentIdx = stageOrder.indexOf(currentStage);
    const nextStage = stageOrder[(currentIdx + 1) % stageOrder.length];
    setApplications((prev) => prev.map((a) => a.id === appId ? { ...a, stage: nextStage } : a));
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-surface-900">Application Tracker</h1>
        <p className="text-sm text-surface-500 mt-1">Drag and drop cards between stages to track your progress</p>
      </div>

      {/* Kanban board */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="flex-shrink-0 w-72"
            onDragOver={(e) => { e.preventDefault(); setDragOverStage(stage.id); }}
            onDragLeave={() => setDragOverStage(null)}
            onDrop={() => handleDrop(stage.id)}
          >
            {/* Column header */}
            <div className={`p-3 rounded-xl ${stage.color} mb-3 flex items-center justify-between`}>
              <span className="text-sm font-semibold text-surface-700">{stage.label}</span>
              <span className="font-mono text-xs font-semibold text-surface-500 bg-white/60 px-2 py-0.5 rounded-full">
                {grouped[stage.id].length}
              </span>
            </div>

            {/* Column body */}
            <div
              className={`min-h-[200px] p-2 rounded-xl transition-colors ${
                dragOverStage === stage.id ? 'bg-primary-50 border-2 border-dashed border-primary-300' : ''
              }`}
            >
              {grouped[stage.id].length === 0 ? (
                <div className="flex items-center justify-center h-32 text-xs text-surface-300">
                  Drop cards here
                </div>
              ) : (
                <div className="space-y-2">
                  {grouped[stage.id].map((app) => {
                    const urgency = getDeadlineUrgency(app.deadline ? Math.ceil((new Date(app.deadline).getTime() - Date.now()) / 86400000) : 0);
                    return (
                      <div
                        key={app.id}
                        draggable
                        onDragStart={() => setDraggedId(app.id)}
                        onDragEnd={() => { setDraggedId(null); setDragOverStage(null); }}
                        onClick={() => onViewOpportunity(app.opportunityId)}
                        className={`card p-3 cursor-move hover:shadow-elevated transition-all duration-200 ${
                          draggedId === app.id ? 'opacity-40' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <GripVertical className="w-4 h-4 text-surface-300 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                              style={{ backgroundColor: `${app.logoColor}15` }}
                            >
                              <span className="font-heading font-bold text-xs" style={{ color: app.logoColor }}>
                                {app.organization.charAt(0)}
                              </span>
                            </div>
                            <h3 className="text-sm font-semibold text-surface-900 truncate">{app.opportunityTitle}</h3>
                            <p className="text-xs text-surface-500 mb-2">{app.organization}</p>

                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-xs font-bold text-primary-600">{app.matchScore}%</span>
                              <MatchBadge type={app.matchType} size="sm" />
                            </div>

                            <div className="flex items-center gap-3 text-xs text-surface-500">
                              <span className={`flex items-center gap-1 ${urgency.color}`}>
                                <Clock className="w-3 h-3" />
                                {urgency.label}
                              </span>
                              {app.appliedDate && (
                                <span className="text-surface-400">
                                  Applied {new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile hint */}
      <p className="lg:hidden text-xs text-surface-400 text-center mt-4">
        Tip: On mobile, tap a card to advance it to the next stage.
      </p>
    </div>
  );
}
