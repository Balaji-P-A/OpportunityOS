import {
  LayoutDashboard,
  User,
  Compass,
  HelpCircle,
  TrendingUp,
  Bookmark,
  ClipboardList,
  Search,
  Sparkles,
  Settings,
  Bell,
  Menu,
  X,
} from 'lucide-react';
import type { PageId, UserProfile } from '@/types';
import { currentUser } from '@/data/mockData';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  notificationCount: number;
}

const navItems: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'missing', label: 'What Am I Missing?', icon: HelpCircle },
  { id: 'growth', label: 'Growth', icon: TrendingUp },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'applications', label: 'Applications', icon: ClipboardList },
];

export function Sidebar({ currentPage, onNavigate, mobileOpen, onMobileClose, notificationCount }: SidebarProps) {
  const user: UserProfile = currentUser;

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-surface-950/40 backdrop-blur-sm lg:hidden" onClick={onMobileClose} />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-surface-200 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-surface-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-soft">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-base text-surface-900 leading-none">OpportunityOS</h1>
              <p className="text-[10px] text-surface-400 mt-0.5">Intelligence Platform</p>
            </div>
          </div>
          <button onClick={onMobileClose} className="lg:hidden p-1 rounded-lg hover:bg-surface-100">
            <X className="w-5 h-5 text-surface-500" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onMobileClose();
                }}
                className={`nav-link w-full ${active ? 'nav-link-active' : ''}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.id === 'missing' && (
                  <span className="text-[10px] font-semibold text-accent-600 bg-accent-50 px-1.5 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-surface-100">
            <button
              onClick={() => {
                onNavigate('search');
                onMobileClose();
              }}
              className={`nav-link w-full ${currentPage === 'search' ? 'nav-link-active' : ''}`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <button
              onClick={() => {
                onNavigate('assistant');
                onMobileClose();
              }}
              className={`nav-link w-full ${currentPage === 'assistant' ? 'nav-link-active' : ''}`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Assistant</span>
            </button>
            <button
              onClick={() => {
                onNavigate('notifications');
                onMobileClose();
              }}
              className={`nav-link w-full ${currentPage === 'notifications' ? 'nav-link-active' : ''}`}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
              {notificationCount > 0 && (
                <span className="text-[10px] font-semibold text-white bg-danger-500 px-1.5 py-0.5 rounded-full ml-auto">
                  {notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                onNavigate('settings');
                onMobileClose();
              }}
              className={`nav-link w-full ${currentPage === 'settings' ? 'nav-link-active' : ''}`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* User card */}
        <div className="p-3 border-t border-surface-100">
          <button
            onClick={() => {
              onNavigate('profile');
              onMobileClose();
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-50 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold font-heading"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-sm font-semibold text-surface-900 truncate">{user.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex-1 h-1 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `${user.profileCompletion}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] font-semibold text-surface-500">{user.profileCompletion}%</span>
              </div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}

interface TopBarProps {
  onMobileMenu: () => void;
  onNavigate: (page: PageId) => void;
  notificationCount: number;
}

export function TopBar({ onMobileMenu, onNavigate, notificationCount }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-surface-50/80 backdrop-blur-xl border-b border-surface-200/60">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        <button onClick={onMobileMenu} className="lg:hidden p-2 rounded-lg hover:bg-surface-100">
          <Menu className="w-5 h-5 text-surface-600" />
        </button>

        {/* Search */}
        <button
          onClick={() => onNavigate('search')}
          className="flex-1 max-w-md flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-surface-200 text-sm text-surface-400 hover:border-surface-300 transition-colors text-left"
        >
          <Search className="w-4 h-4" />
          <span className="truncate">Find opportunities that match my skills and career goals...</span>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          {/* AI Assistant */}
          <button
            onClick={() => onNavigate('assistant')}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden md:inline">AI Assistant</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => onNavigate('notifications')}
            className="relative p-2.5 rounded-xl hover:bg-surface-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-surface-600" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full ring-2 ring-surface-50" />
            )}
          </button>

          {/* Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold font-heading text-sm hover:ring-2 hover:ring-primary-200 transition-all"
            style={{ backgroundColor: currentUser.avatarColor }}
          >
            {currentUser.name.split(' ').map((n) => n[0]).join('')}
          </button>
        </div>
      </div>
    </header>
  );
}
