import { useState } from 'react';
import { User, X, ArrowRight, Sparkles } from 'lucide-react';
import { currentUser } from '@/data/mockData';
import { StrengthBar } from '@/components/ui/StrengthBar';
import type { ProfileDimension } from '@/types';

type PositionedDimension = ProfileDimension & { x: number; y: number; color: string };

interface ProfilePageProps {
  onNavigate: (page: 'discover') => void;
}

const typeColors: Record<string, string> = {
  education: '#3b82f6',
  skill: '#22c55e',
  interest: '#8b5cf6',
  experience: '#f59e0b',
  activity: '#06b6d4',
  goal: '#ec4899',
  preference: '#64748b',
};

const typeLabels: Record<string, string> = {
  education: 'Education',
  skill: 'Skill',
  interest: 'Interest',
  experience: 'Experience',
  activity: 'Activity',
  goal: 'Goal',
  preference: 'Preference',
};

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [selectedDim, setSelectedDim] = useState<PositionedDimension | null>(null);
  const user = currentUser;

  // Position dimensions in a circle
  const positioned = user.dimensions.map((dim, idx) => {
    const angle = (idx / user.dimensions.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 42; // percentage from center
    return {
      ...dim,
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
      color: typeColors[dim.type] || '#6366f1',
    };
  });

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-surface-900">My Profile</h1>
        <p className="text-sm text-surface-500 mt-1">Your multidimensional opportunity profile map</p>
      </div>

      {/* Profile completion */}
      <div className="card p-4 mb-6 flex items-center gap-4">
        <div className="relative w-14 h-14">
          <svg width="56" height="56" className="transform -rotate-90">
            <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-surface-100" />
            <circle cx="28" cy="28" r="24" fill="none" stroke="#4f46e5" strokeWidth="4" strokeDasharray={2 * Math.PI * 24} strokeDashoffset={2 * Math.PI * 24 * (1 - user.profileCompletion / 100)} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-primary-600">{user.profileCompletion}%</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-surface-800">Profile Completion</p>
          <p className="text-xs text-surface-500">Add more details to improve your match quality</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="font-mono text-2xl font-bold text-surface-900">{user.dimensions.length}</span>
          <span className="text-xs text-surface-500">dimensions</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile map */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Profile Map</h2>
              <span className="text-xs text-surface-400">Click a node to explore</span>
            </div>

            {/* Desktop: circular map */}
            <div className="hidden md:block relative aspect-square max-w-lg mx-auto">
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                {positioned.map((dim, idx) => (
                  <line
                    key={dim.id}
                    x1="50%"
                    y1="50%"
                    x2={`${dim.x}%`}
                    y2={`${dim.y}%`}
                    stroke={dim.color}
                    strokeWidth="1.5"
                    strokeOpacity={selectedDim?.id === dim.id ? '0.5' : '0.15'}
                    strokeDasharray={selectedDim?.id === dim.id ? '0' : '5 5'}
                    className="transition-all duration-300"
                  />
                ))}
              </svg>

              {/* Center user node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary-600 flex items-center justify-center shadow-glow">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white shadow-soft text-[10px] font-semibold text-surface-700 whitespace-nowrap">
                    {user.name.split(' ')[0].toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Dimension nodes */}
              {positioned.map((dim) => (
                <button
                  key={dim.id}
                  onClick={() => setSelectedDim(dim)}
                  className="absolute z-10 group"
                  style={{ left: `${dim.x}%`, top: `${dim.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div
                    className={`px-3 py-2.5 rounded-xl bg-white border shadow-card transition-all duration-200 hover:scale-110 hover:shadow-elevated ${
                      selectedDim?.id === dim.id ? 'ring-2 ring-offset-2 ring-primary-400' : ''
                    }`}
                    style={{ borderColor: `${dim.color}40` }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dim.color }} />
                      <span className="text-xs font-semibold whitespace-nowrap" style={{ color: dim.color }}>
                        {dim.label}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="flex-1 h-1 bg-surface-100 rounded-full overflow-hidden min-w-[40px]">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${dim.strength}%`, backgroundColor: dim.color }} />
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-surface-500">{dim.strength}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="md:hidden">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center shadow-glow">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                {positioned.map((dim) => (
                  <button
                    key={dim.id}
                    onClick={() => setSelectedDim(dim)}
                    className="flex-shrink-0 w-36 p-3 rounded-xl bg-white border shadow-card text-left"
                    style={{ borderColor: `${dim.color}40` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dim.color }} />
                      <span className="text-xs font-semibold" style={{ color: dim.color }}>{dim.label}</span>
                    </div>
                    <StrengthBar value={dim.strength} compact animate={false} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Skills detail */}
          <div className="card p-6 mt-6">
            <h2 className="section-title mb-4">Skills</h2>
            <div className="space-y-3">
              {user.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-surface-800 w-32 truncate">{skill.name}</span>
                  <div className="flex-1"><StrengthBar value={skill.strength} compact animate={false} /></div>
                  <span className="text-xs font-medium text-surface-500 capitalize w-20 text-right">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="card p-6 mt-6">
            <h2 className="section-title mb-4">Experience</h2>
            <div className="space-y-3">
              {user.experience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-surface-50 border border-surface-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{exp.type.replace('-', ' ')}</span>
                    <span className="text-xs text-surface-400">·</span>
                    <span className="text-xs text-surface-500">{exp.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-surface-900">{exp.title}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{exp.organization}</p>
                  <p className="text-sm text-surface-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contextual panel */}
        <div className="lg:col-span-1">
          {selectedDim ? (
            <div className="card p-5 sticky top-20 animate-slide-in-right">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedDim.color }} />
                  <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
                    {typeLabels[selectedDim.type]}
                  </span>
                </div>
                <button onClick={() => setSelectedDim(null)} className="p-1 rounded-lg hover:bg-surface-100">
                  <X className="w-4 h-4 text-surface-400" />
                </button>
              </div>

              <h3 className="font-heading text-lg font-semibold text-surface-900 mb-4">{selectedDim.label}</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Strength</p>
                  <div className="flex items-center gap-3">
                    <StrengthBar value={selectedDim.strength} animate={false} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Evidence</p>
                  <div className="space-y-1.5">
                    {selectedDim.evidence.map((ev, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-surface-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-surface-300 mt-1.5 flex-shrink-0" />
                        {ev}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-surface-600">Related opportunities</span>
                    <span className="font-mono text-lg font-bold" style={{ color: selectedDim.color }}>
                      {selectedDim.relatedOpportunities}
                    </span>
                  </div>
                </div>

                <button onClick={() => onNavigate('discover')} className="btn-secondary w-full text-sm">
                  View related opportunities
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="card p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Profile Summary</span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Current Direction</p>
                  <p className="text-sm font-semibold text-surface-800">{user.currentDirection}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Goal</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-surface-800">{user.currentDirection}</span>
                    <ArrowRight className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-semibold text-primary-700">{user.goal}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Goal Interests</p>
                  <div className="flex flex-wrap gap-1.5">
                    {user.goalInterests.map((g) => (
                      <span key={g} className="chip bg-secondary-50 border-secondary-200 text-secondary-700">{g}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-surface-100">
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Preferences</p>
                  <div className="space-y-1.5 text-sm text-surface-600">
                    <p>Mode: <span className="font-medium capitalize">{user.preferences.mode.join(', ')}</span></p>
                    <p>Location: <span className="font-medium">{user.preferences.location}</span></p>
                    <p>Time: <span className="font-medium">{user.preferences.timeAvailability}</span></p>
                    <p>Team: <span className="font-medium">{user.preferences.teamPreference}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
