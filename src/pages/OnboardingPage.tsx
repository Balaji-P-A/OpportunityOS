import { useState } from 'react';
import {
  Sparkles, ArrowRight, ArrowLeft, Check, GraduationCap, Code2, Heart,
  Briefcase, Target, SlidersHorizontal, Plus, X, GripVertical, ChevronDown,
} from 'lucide-react';
import { skillSuggestions, interestSuggestions, goalOptions, currentDirectionOptions } from '@/data/mockData';
import type { SkillLevel } from '@/types';

interface OnboardingPageProps {
  onComplete: () => void;
}

const steps = [
  { id: 0, label: 'Education', icon: GraduationCap },
  { id: 1, label: 'Skills', icon: Code2 },
  { id: 2, label: 'Interests', icon: Heart },
  { id: 3, label: 'Experience', icon: Briefcase },
  { id: 4, label: 'Goals', icon: Target },
  { id: 5, label: 'Preferences', icon: SlidersHorizontal },
];

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [education, setEducation] = useState({ degree: '', field: '', institution: '', graduationYear: '' });
  const [skills, setSkills] = useState<{ name: string; level: SkillLevel }[]>([]);
  const [skillSearch, setSkillSearch] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [experience, setExperience] = useState<{ id: string; type: string; title: string; organization: string; description: string }[]>([]);
  const [expType, setExpType] = useState('');
  const [currentDirection, setCurrentDirection] = useState('');
  const [goal, setGoal] = useState('');
  const [prefs, setPrefs] = useState({
    mode: [] as string[],
    location: '',
    opportunityTypes: [] as string[],
    timeAvailability: '',
    teamPreference: '',
  });

  const canProceed = () => {
    switch (currentStep) {
      case 0: return education.degree && education.institution;
      case 1: return skills.length >= 1;
      case 2: return interests.length >= 1;
      case 3: return true;
      case 4: return currentDirection && goal;
      case 5: return true;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const addSkill = (name: string, level: SkillLevel = 'intermediate') => {
    if (!skills.find((s) => s.name === name)) {
      setSkills([...skills, { name, level }]);
    }
    setSkillSearch('');
  };

  const filteredSkills = skillSuggestions.filter(
    (s) => s.toLowerCase().includes(skillSearch.toLowerCase()) && !skills.find((sk) => sk.name === s)
  );

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const moveInterest = (idx: number, dir: 'up' | 'down') => {
    const newInterests = [...interests];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target >= 0 && target < newInterests.length) {
      [newInterests[idx], newInterests[target]] = [newInterests[target], newInterests[idx]];
      setInterests(newInterests);
    }
  };

  const addExperience = () => {
    if (expType) {
      setExperience([...experience, { id: Date.now().toString(), type: expType, title: '', organization: '', description: '' }]);
      setExpType('');
    }
  };

  const expTypes = ['Project', 'Internship', 'Hackathon', 'Leadership', 'Open Source', 'Research'];
  const opportunityTypes = ['Hackathons', 'Internships', 'Competitions', 'Fellowships', 'Research', 'Open Source'];
  const modes = ['Online', 'Offline', 'Hybrid'];
  const timeOptions = ['< 5 hrs/week', '5-10 hrs/week', '10-15 hrs/week', '15+ hrs/week'];
  const teamOptions = ['Individual', 'Team 1-4', 'Team 5-10', 'No preference'];

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-surface-100 bg-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-semibold text-sm text-surface-900">OpportunityOS</span>
          </div>
          <p className="text-xs text-surface-500">Step {currentStep + 1} of {steps.length}</p>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white border-b border-surface-100">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const done = idx < currentStep;
              const active = idx === currentStep;
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        done ? 'bg-success-500 text-white' : active ? 'bg-primary-600 text-white shadow-glow' : 'bg-surface-100 text-surface-400'
                      }`}
                    >
                      {done ? <Check className="w-4 h-4" strokeWidth={3} /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-[10px] font-medium hidden sm:block ${active ? 'text-primary-600' : done ? 'text-success-600' : 'text-surface-400'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 rounded-full transition-all duration-300 ${done ? 'bg-success-500' : 'bg-surface-100'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center p-4 lg:p-8">
        <div className="w-full max-w-2xl">
          {/* Step 0: Education */}
          {currentStep === 0 && (
            <div className="animate-fade-in-up space-y-5">
              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-surface-900 mb-1">Tell us about your education</h2>
                <p className="text-sm text-surface-500">This helps us understand your academic background.</p>
              </div>
              <div className="card p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Degree</label>
                    <input className="input" placeholder="e.g., BCA, B.Tech" value={education.degree} onChange={(e) => setEducation({ ...education, degree: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Field</label>
                    <input className="input" placeholder="e.g., Computer Applications" value={education.field} onChange={(e) => setEducation({ ...education, field: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Institution</label>
                    <input className="input" placeholder="e.g., Christ University" value={education.institution} onChange={(e) => setEducation({ ...education, institution: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Graduation Year</label>
                    <input className="input" placeholder="e.g., 2025" value={education.graduationYear} onChange={(e) => setEducation({ ...education, graduationYear: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Skills */}
          {currentStep === 1 && (
            <div className="animate-fade-in-up space-y-5">
              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-surface-900 mb-1">What are your skills?</h2>
                <p className="text-sm text-surface-500">Search and add skills with your proficiency level.</p>
              </div>
              <div className="card p-6 space-y-4">
                <div className="relative">
                  <input
                    className="input"
                    placeholder="Search skills... (e.g., Python, SQL, React)"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                  />
                  {skillSearch && filteredSkills.length > 0 && (
                    <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-surface-200 rounded-xl shadow-elevated max-h-48 overflow-y-auto">
                      {filteredSkills.slice(0, 6).map((s) => (
                        <button key={s} onClick={() => addSkill(s)} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 text-left">
                          <Plus className="w-4 h-4 text-surface-400" />
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {skills.length > 0 && (
                  <div className="space-y-2">
                    {skills.map((skill, idx) => (
                      <div key={skill.name} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 border border-surface-100">
                        <span className="flex-1 text-sm font-medium text-surface-800">{skill.name}</span>
                        <div className="flex items-center gap-1">
                          {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map((level) => (
                            <button
                              key={level}
                              onClick={() => setSkills(skills.map((s, i) => i === idx ? { ...s, level } : s))}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                                skill.level === level ? 'bg-primary-600 text-white' : 'bg-white text-surface-500 border border-surface-200 hover:border-surface-300'
                              }`}
                            >
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                          ))}
                        </div>
                        <button onClick={() => setSkills(skills.filter((_, i) => i !== idx))} className="p-1 rounded-lg hover:bg-surface-200">
                          <X className="w-4 h-4 text-surface-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <p className="text-xs text-surface-500 mb-2">Popular skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {skillSuggestions.slice(0, 10).map((s) => (
                      !skills.find((sk) => sk.name === s) && (
                        <button key={s} onClick={() => addSkill(s)} className="chip bg-white border-surface-200 text-surface-600 hover:border-primary-300 hover:text-primary-600 transition-colors">
                          <Plus className="w-3 h-3" /> {s}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {currentStep === 2 && (
            <div className="animate-fade-in-up space-y-5">
              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-surface-900 mb-1">What interests you?</h2>
                <p className="text-sm text-surface-500">Select multiple interests and rank your top ones.</p>
              </div>
              <div className="card p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {interestSuggestions.map((interest) => {
                    const selected = interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`chip transition-all ${
                          selected ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-surface-200 text-surface-600 hover:border-primary-300'
                        }`}
                      >
                        {selected && <Check className="w-3 h-3" />}
                        {interest}
                      </button>
                    );
                  })}
                </div>

                {interests.length > 0 && (
                  <div className="pt-3 border-t border-surface-100">
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Rank your top interests</p>
                    <div className="space-y-2">
                      {interests.map((interest, idx) => (
                        <div key={interest} className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-50 border border-surface-100">
                          <GripVertical className="w-4 h-4 text-surface-300" />
                          <span className="font-mono text-xs font-semibold text-surface-400 w-5">{idx + 1}</span>
                          <span className="flex-1 text-sm font-medium text-surface-800">{interest}</span>
                          <button onClick={() => moveInterest(idx, 'up')} disabled={idx === 0} className="p-1 rounded hover:bg-surface-200 disabled:opacity-30">
                            <ChevronDown className="w-4 h-4 rotate-180 text-surface-500" />
                          </button>
                          <button onClick={() => moveInterest(idx, 'down')} disabled={idx === interests.length - 1} className="p-1 rounded hover:bg-surface-200 disabled:opacity-30">
                            <ChevronDown className="w-4 h-4 text-surface-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {currentStep === 3 && (
            <div className="animate-fade-in-up space-y-5">
              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-surface-900 mb-1">Add your experience</h2>
                <p className="text-sm text-surface-500">Projects, internships, hackathons, leadership, and more.</p>
              </div>
              <div className="card p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {expTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setExperience([...experience, { id: Date.now().toString(), type, title: '', organization: '', description: '' }]);
                      }}
                      className="chip bg-white border-surface-200 text-surface-600 hover:border-primary-300 hover:text-primary-600 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> {type}
                    </button>
                  ))}
                </div>

                {experience.length > 0 ? (
                  <div className="space-y-3">
                    {experience.map((exp, idx) => (
                      <div key={exp.id} className="p-4 rounded-xl bg-surface-50 border border-surface-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{exp.type}</span>
                          <button onClick={() => setExperience(experience.filter((_, i) => i !== idx))} className="p-1 rounded-lg hover:bg-surface-200">
                            <X className="w-4 h-4 text-surface-400" />
                          </button>
                        </div>
                        <input className="input" placeholder="Title" value={exp.title} onChange={(e) => setExperience(experience.map((x, i) => i === idx ? { ...x, title: e.target.value } : x))} />
                        <input className="input" placeholder="Organization" value={exp.organization} onChange={(e) => setExperience(experience.map((x, i) => i === idx ? { ...x, organization: e.target.value } : x))} />
                        <textarea className="input min-h-[60px] resize-none" placeholder="Brief description" value={exp.description} onChange={(e) => setExperience(experience.map((x, i) => i === idx ? { ...x, description: e.target.value } : x))} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-surface-400 text-center py-8">Add at least one experience to strengthen your profile, or skip this step.</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Goals */}
          {currentStep === 4 && (
            <div className="animate-fade-in-up space-y-5">
              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-surface-900 mb-1">Where do you want to go?</h2>
                <p className="text-sm text-surface-500">We'll find opportunities that bridge the gap.</p>
              </div>
              <div className="card p-6 space-y-6">
                <div>
                  <label className="label">Current direction</label>
                  <select className="input" value={currentDirection} onChange={(e) => setCurrentDirection(e.target.value)}>
                    <option value="">Select your current direction</option>
                    {currentDirectionOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Goal — where do you want to be?</label>
                  <select className="input" value={goal} onChange={(e) => setGoal(e.target.value)}>
                    <option value="">Select your career goal</option>
                    {goalOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                {currentDirection && goal && (
                  <div className="animate-fade-in-up">
                    <div className="flex items-center justify-between gap-2 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100">
                      <div className="text-center flex-1">
                        <p className="text-xs text-surface-500 mb-1">Current</p>
                        <p className="text-sm font-semibold text-surface-800">{currentDirection}</p>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <ArrowRight className="w-5 h-5 text-primary-500" />
                        <span className="text-[10px] text-primary-600 font-medium">Interested In</span>
                      </div>
                      <div className="text-center flex-1">
                        <p className="text-xs text-surface-500 mb-1">Goal</p>
                        <p className="text-sm font-semibold text-primary-700">{goal}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Preferences */}
          {currentStep === 5 && (
            <div className="animate-fade-in-up space-y-5">
              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl font-bold text-surface-900 mb-1">Your preferences</h2>
                <p className="text-sm text-surface-500">We'll use these to filter your opportunities.</p>
              </div>
              <div className="card p-6 space-y-5">
                <div>
                  <label className="label">Mode</label>
                  <div className="flex flex-wrap gap-2">
                    {modes.map((m) => (
                      <button
                        key={m}
                        onClick={() => setPrefs({
                          ...prefs,
                          mode: prefs.mode.includes(m.toLowerCase()) ? prefs.mode.filter((x) => x !== m.toLowerCase()) : [...prefs.mode, m.toLowerCase()],
                        })}
                        className={`chip transition-all ${prefs.mode.includes(m.toLowerCase()) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-surface-200 text-surface-600'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label">Location</label>
                  <input className="input" placeholder="e.g., Bangalore, India" value={prefs.location} onChange={(e) => setPrefs({ ...prefs, location: e.target.value })} />
                </div>
                <div>
                  <label className="label">Opportunity types</label>
                  <div className="flex flex-wrap gap-2">
                    {opportunityTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setPrefs({
                          ...prefs,
                          opportunityTypes: prefs.opportunityTypes.includes(t) ? prefs.opportunityTypes.filter((x) => x !== t) : [...prefs.opportunityTypes, t],
                        })}
                        className={`chip transition-all ${prefs.opportunityTypes.includes(t) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white border-surface-200 text-surface-600'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Time availability</label>
                    <select className="input" value={prefs.timeAvailability} onChange={(e) => setPrefs({ ...prefs, timeAvailability: e.target.value })}>
                      <option value="">Select</option>
                      {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Team preference</label>
                    <select className="input" value={prefs.teamPreference} onChange={(e) => setPrefs({ ...prefs, teamPreference: e.target.value })}>
                      <option value="">Select</option>
                      {teamOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
              className={`btn-ghost ${currentStep === 0 ? 'invisible' : ''}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button onClick={handleNext} disabled={!canProceed()} className="btn-primary">
              {currentStep === 5 ? 'Complete Profile' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
