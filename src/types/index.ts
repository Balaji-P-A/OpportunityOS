// Core domain types for OpportunityOS

export type MatchType = 'direct' | 'cross-domain' | 'growth';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type OpportunityMode = 'online' | 'offline' | 'hybrid';
export type ApplicationStage = 'saved' | 'planning' | 'applied' | 'shortlisted' | 'interview' | 'selected';
export type NotificationPriority = 'urgent' | 'relevant' | 'growth';

export interface Education {
  degree: string;
  field: string;
  institution: string;
  graduationYear: string;
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: 'technical' | 'business' | 'creative' | 'analytical';
  strength: number; // 0-100
}

export interface Interest {
  id: string;
  name: string;
  strength: number; // 0-100
  rank?: number;
  evidence: string[];
}

export interface ExperienceItem {
  id: string;
  type: 'project' | 'internship' | 'hackathon' | 'leadership' | 'open-source' | 'research';
  title: string;
  organization: string;
  description: string;
  date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  education: Education;
  skills: Skill[];
  interests: Interest[];
  experience: ExperienceItem[];
  currentDirection: string;
  goal: string;
  goalInterests: string[];
  preferences: {
    mode: OpportunityMode[];
    location: string;
    opportunityTypes: string[];
    timeAvailability: string;
    teamPreference: string;
  };
  profileCompletion: number;
  dimensions: ProfileDimension[];
}

export interface ProfileDimension {
  id: string;
  label: string;
  type: 'education' | 'skill' | 'interest' | 'experience' | 'activity' | 'goal' | 'preference';
  strength: number;
  evidence: string[];
  relatedOpportunities: number;
}

export interface MatchReason {
  matched: boolean;
  label: string;
  category: 'skill' | 'interest' | 'experience' | 'education' | 'preference';
  detail?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  logoColor: string;
  matchScore: number;
  matchType: MatchType;
  domains: string[];
  deadline: string;
  daysLeft: number;
  mode: OpportunityMode;
  teamSize: string;
  matchReasons: MatchReason[];
  missingReasons: MatchReason[];
  growthDimension?: string;
  description: string;
  eligibility: string[];
  requiredSkills: string[];
  careerValue: string;
  source: string;
  urgent?: boolean;
  careerPathIndex?: number;
}

export interface GrowthNode {
  id: string;
  label: string;
  type: 'current' | 'opportunity' | 'milestone' | 'goal';
  currentFit: number;
  goalAlignment: number;
  skillsGained: string[];
  experienceGained: string[];
  opportunityId?: string;
}

export interface GrowthPath {
  id: string;
  title: string;
  nodes: GrowthNode[];
}

export interface ApplicationItem {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  organization: string;
  matchScore: number;
  matchType: MatchType;
  deadline: string;
  appliedDate?: string;
  stage: ApplicationStage;
  logoColor: string;
}

export interface NotificationItem {
  id: string;
  priority: NotificationPriority;
  title: string;
  message: string;
  time: string;
  read: boolean;
  opportunityId?: string;
}

export interface InsightCard {
  title: string;
  message: string;
  currentFocus: string;
  hiddenDimensions: string[];
}

export interface OverlookedOpportunity {
  id: string;
  title: string;
  matchScore: number;
  matchType: MatchType;
  reasonMissed: string;
  dimensions: string[];
  deadline: string;
  daysLeft: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: {
    title: string;
    matchScore: number;
    matchType: MatchType;
    why: string[];
    missing: string[];
  }[];
  nextStep?: string;
}

export type PageId =
  | 'landing'
  | 'login'
  | 'register'
  | 'onboarding'
  | 'analysis'
  | 'dashboard'
  | 'profile'
  | 'discover'
  | 'opportunity'
  | 'missing'
  | 'growth'
  | 'saved'
  | 'applications'
  | 'search'
  | 'assistant'
  | 'notifications'
  | 'settings';

export interface AppState {
  currentPage: PageId;
  selectedOpportunityId: string | null;
  selectedDimensionId: string | null;
  savedOpportunityIds: Set<string>;
  applications: ApplicationItem[];
  notifications: NotificationItem[];
  isAuthed: boolean;
  hasOnboarded: boolean;
}
