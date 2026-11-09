import { useState } from 'react';
import {
  User, SlidersHorizontal, Bell, Shield, Sparkles, Palette,
  Check, ChevronRight, Trash2,
} from 'lucide-react';
import { currentUser } from '@/data/mockData';

const sections = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'profile', label: 'Profile', icon: SlidersHorizontal },
  { id: 'opportunity', label: 'Opportunity Preferences', icon: SlidersHorizontal },
  { id: 'notifications', label: 'Notification Preferences', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'ai', label: 'AI Preferences', icon: Sparkles },
  { id: 'theme', label: 'Theme', icon: Palette },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');
  const [aiSettings, setAiSettings] = useState({
    analyzeProfile: true,
    learnFromActivity: true,
    showMissingOpportunities: true,
    crossDomainRecommendations: true,
  });
  const [notifSettings, setNotifSettings] = useState({
    urgent: true,
    relevant: true,
    growth: true,
    email: false,
    frequency: 'instant' as 'instant' | 'daily' | 'weekly',
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-surface-900">Settings</h1>
        <p className="text-sm text-surface-500 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Section nav */}
        <div className="lg:col-span-1">
          <div className="card p-2 lg:sticky lg:top-20">
            <div className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                      activeSection === section.id ? 'bg-primary-50 text-primary-700' : 'text-surface-500 hover:bg-surface-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Account */}
          {activeSection === 'account' && (
            <div className="card p-6 space-y-5 animate-fade-in">
              <h2 className="section-title">Account</h2>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-heading font-bold text-xl"
                  style={{ backgroundColor: currentUser.avatarColor }}
                >
                  {currentUser.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-surface-900">{currentUser.name}</p>
                  <p className="text-sm text-surface-500">{currentUser.email}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Name</label>
                  <input className="input" defaultValue={currentUser.name} />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input className="input" defaultValue={currentUser.email} disabled />
                </div>
              </div>
              <div>
                <label className="label">Password</label>
                <button className="btn-secondary text-sm">Change password</button>
              </div>
            </div>
          )}

          {/* Profile */}
          {activeSection === 'profile' && (
            <div className="card p-6 space-y-5 animate-fade-in">
              <h2 className="section-title">Profile</h2>
              <div>
                <p className="text-sm text-surface-600 mb-3">Profile completion: <span className="font-mono font-semibold text-primary-600">{currentUser.profileCompletion}%</span></p>
                <div className="h-2 bg-surface-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: `${currentUser.profileCompletion}%` }} />
                </div>
                <button className="btn-secondary text-sm">Edit profile details</button>
              </div>
              <div className="pt-4 border-t border-surface-100">
                <p className="text-sm text-surface-600 mb-3">Your profile has {currentUser.dimensions.length} dimensions</p>
                <div className="flex flex-wrap gap-2">
                  {currentUser.dimensions.map((d) => (
                    <span key={d.id} className="chip bg-surface-50 border-surface-200 text-surface-600">{d.label}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Opportunity Preferences */}
          {activeSection === 'opportunity' && (
            <div className="card p-6 space-y-5 animate-fade-in">
              <h2 className="section-title">Opportunity Preferences</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Preferred Mode</label>
                  <div className="flex flex-wrap gap-2">
                    {['Online', 'Offline', 'Hybrid'].map((m) => (
                      <span key={m} className={`chip capitalize ${currentUser.preferences.mode.includes(m.toLowerCase() as 'online' | 'offline' | 'hybrid') ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-white border-surface-200 text-surface-400'}`}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label">Location</label>
                  <input className="input" defaultValue={currentUser.preferences.location} />
                </div>
                <div>
                  <label className="label">Time Availability</label>
                  <input className="input" defaultValue={currentUser.preferences.timeAvailability} />
                </div>
                <div>
                  <label className="label">Team Preference</label>
                  <input className="input" defaultValue={currentUser.preferences.teamPreference} />
                </div>
              </div>
              <div>
                <label className="label">Opportunity Types</label>
                <div className="flex flex-wrap gap-2">
                  {currentUser.preferences.opportunityTypes.map((t) => (
                    <span key={t} className="chip bg-primary-50 border-primary-200 text-primary-700">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="card p-6 space-y-5 animate-fade-in">
              <h2 className="section-title">Notification Preferences</h2>
              {([
                { key: 'urgent' as const, label: 'Urgent notifications', desc: 'Deadlines and time-sensitive alerts' },
                { key: 'relevant' as const, label: 'Relevant notifications', desc: 'New high-match opportunities' },
                { key: 'growth' as const, label: 'Growth notifications', desc: 'Opportunities aligned with your career goal' },
              ]).map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                  <div>
                    <p className="text-sm font-semibold text-surface-800">{item.label}</p>
                    <p className="text-xs text-surface-500">{item.desc}</p>
                  </div>
                  <Toggle
                    checked={notifSettings[item.key]}
                    onChange={(v) => setNotifSettings({ ...notifSettings, [item.key]: v })}
                  />
                </div>
              ))}
              <div className="pt-4 border-t border-surface-100">
                <label className="label">Notification frequency</label>
                <div className="flex gap-2">
                  {(['instant', 'daily', 'weekly'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setNotifSettings({ ...notifSettings, frequency: f })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                        notifSettings.frequency === f ? 'bg-primary-600 text-white' : 'bg-white border border-surface-200 text-surface-600'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                <div>
                  <p className="text-sm font-semibold text-surface-800">Email notifications</p>
                  <p className="text-xs text-surface-500">Receive notifications via email</p>
                </div>
                <Toggle checked={notifSettings.email} onChange={(v) => setNotifSettings({ ...notifSettings, email: v })} />
              </div>
            </div>
          )}

          {/* Privacy */}
          {activeSection === 'privacy' && (
            <div className="card p-6 space-y-5 animate-fade-in">
              <h2 className="section-title">Privacy</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                  <div>
                    <p className="text-sm font-semibold text-surface-800">Profile visibility</p>
                    <p className="text-xs text-surface-500">Control who can see your profile</p>
                  </div>
                  <select className="input w-auto text-sm">
                    <option>Private</option>
                    <option>Connections only</option>
                    <option>Public</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                  <div>
                    <p className="text-sm font-semibold text-surface-800">Activity tracking</p>
                    <p className="text-xs text-surface-500">Track your search and save activity for better recommendations</p>
                  </div>
                  <Toggle checked={true} onChange={() => {}} />
                </div>
              </div>
              <div className="pt-4 border-t border-surface-100">
                <p className="text-sm font-semibold text-danger-600 mb-2">Danger Zone</p>
                {!showDeleteConfirm ? (
                  <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-2 text-sm font-medium text-danger-600 hover:text-danger-700">
                    <Trash2 className="w-4 h-4" />
                    Delete my data
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-danger-50 border border-danger-200">
                    <p className="text-sm text-surface-700 mb-3">This will permanently delete your profile, saved opportunities, and applications. This action cannot be undone.</p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-xl bg-danger-600 text-white text-sm font-medium">Delete everything</button>
                      <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary text-sm">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Preferences */}
          {activeSection === 'ai' && (
            <div className="card p-6 space-y-5 animate-fade-in">
              <h2 className="section-title">AI Preferences</h2>
              <p className="text-sm text-surface-500">Control how the AI analyzes your profile and generates recommendations</p>
              {([
                { key: 'analyzeProfile' as const, label: 'Allow AI to analyze my profile', desc: 'The AI uses your education, skills, interests, experience, and goals to find matches' },
                { key: 'learnFromActivity' as const, label: 'Learn from my activity', desc: 'Recommendations improve based on your search, save, and application patterns' },
                { key: 'showMissingOpportunities' as const, label: 'Show "What Am I Missing?" insights', desc: 'Surface opportunities outside your normal search behavior' },
                { key: 'crossDomainRecommendations' as const, label: 'Cross-domain recommendations', desc: 'Include opportunities at the intersection of multiple dimensions' },
              ]).map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-surface-800">{item.label}</p>
                    <p className="text-xs text-surface-500">{item.desc}</p>
                  </div>
                  <Toggle
                    checked={aiSettings[item.key]}
                    onChange={(v) => setAiSettings({ ...aiSettings, [item.key]: v })}
                  />
                </div>
              ))}
              <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                  <p className="text-sm font-semibold text-primary-700">AI Principle</p>
                </div>
                <p className="text-xs text-surface-600">
                  The AI recommends opportunities but never makes irreversible decisions. You always have full control over what to save, apply to, and pursue.
                </p>
              </div>
            </div>
          )}

          {/* Theme */}
          {activeSection === 'theme' && (
            <div className="card p-6 space-y-5 animate-fade-in">
              <h2 className="section-title">Theme</h2>
              <p className="text-sm text-surface-500">Choose your preferred appearance</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-primary-400 shadow-glow' : 'border-surface-200'}`}
                >
                  <div className="bg-surface-50 rounded-xl p-4 mb-3 border border-surface-200">
                    <div className="h-2 bg-primary-200 rounded mb-2 w-1/2" />
                    <div className="h-2 bg-surface-200 rounded w-3/4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-surface-800">Light</span>
                    {theme === 'light' && <Check className="w-4 h-4 text-primary-600" />}
                  </div>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-primary-400 shadow-glow' : 'border-surface-200 opacity-60'}`}
                >
                  <div className="bg-surface-900 rounded-xl p-4 mb-3">
                    <div className="h-2 bg-primary-400 rounded mb-2 w-1/2" />
                    <div className="h-2 bg-surface-700 rounded w-3/4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-surface-800">Dark</span>
                    {theme === 'dark' && <Check className="w-4 h-4 text-primary-600" />}
                  </div>
                </button>
              </div>
              <p className="text-xs text-surface-400">Dark mode is coming soon. Your preference will be saved.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-primary-600' : 'bg-surface-200'}`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-soft transition-transform ${checked ? 'translate-x-5' : ''}`}
      />
    </button>
  );
}
