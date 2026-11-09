import { useState, useCallback } from 'react';
import type { PageId } from '@/types';
import { initialNotifications } from '@/data/mockData';
import { Sidebar, TopBar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toast, useToast } from '@/components/ui/Toast';
import { AIProcessingState } from '@/components/ui/AIProcessingState';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { DiscoverPage } from '@/pages/DiscoverPage';
import { OpportunityDetailPage } from '@/pages/OpportunityDetailPage';
import { MissingPage } from '@/pages/MissingPage';
import { GrowthPage } from '@/pages/GrowthPage';
import { SavedPage } from '@/pages/SavedPage';
import { ApplicationsPage } from '@/pages/ApplicationsPage';
import { SearchPage } from '@/pages/SearchPage';
import { AssistantPage } from '@/pages/AssistantPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { SettingsPage } from '@/pages/SettingsPage';

type AppState = 'landing' | 'auth' | 'onboarding' | 'analysis' | 'app';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const toast = useToast();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNavigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    setSelectedOpportunityId(null);
    window.scrollTo(0, 0);
  }, []);

  const handleViewOpportunity = useCallback((id: string) => {
    setSelectedOpportunityId(id);
    setCurrentPage('opportunity');
    window.scrollTo(0, 0);
  }, []);

  const handleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.show('Removed from saved');
      } else {
        next.add(id);
        toast.show('Saved opportunity');
      }
      return next;
    });
  }, [toast]);

  const handleAuth = useCallback(() => {
    setAppState('onboarding');
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setAppState('analysis');
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setAppState('app');
    setCurrentPage('dashboard');
  }, []);

  // Landing page
  if (appState === 'landing') {
    return <LandingPage onGetStarted={() => { setAuthMode('register'); setAppState('auth'); }} />;
  }

  // Auth
  if (appState === 'auth') {
    return (
      <AuthPage
        mode={authMode}
        onAuth={handleAuth}
        onSwitchMode={setAuthMode}
      />
    );
  }

  // Onboarding
  if (appState === 'onboarding') {
    return <OnboardingPage onComplete={handleOnboardingComplete} />;
  }

  // AI Analysis
  if (appState === 'analysis') {
    return <AIProcessingState onComplete={handleAnalysisComplete} />;
  }

  // Main app
  const showSidebar = appState === 'app';
  const showBottomNav = appState === 'app';

  return (
    <div className="flex min-h-screen bg-surface-50">
      {showSidebar && (
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
          notificationCount={unreadCount}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {showSidebar && (
          <TopBar
            onMobileMenu={() => setMobileSidebarOpen(true)}
            onNavigate={handleNavigate}
            notificationCount={unreadCount}
          />
        )}

        <main className={`flex-1 ${showBottomNav ? 'pb-20 lg:pb-0' : ''}`}>
          {currentPage === 'dashboard' && (
            <DashboardPage
              onNavigate={handleNavigate}
              onViewOpportunity={handleViewOpportunity}
              onSave={handleSave}
              savedIds={savedIds}
            />
          )}
          {currentPage === 'profile' && (
            <ProfilePage onNavigate={handleNavigate} />
          )}
          {currentPage === 'discover' && (
            <DiscoverPage
              onViewOpportunity={handleViewOpportunity}
              onSave={handleSave}
              savedIds={savedIds}
            />
          )}
          {currentPage === 'opportunity' && selectedOpportunityId && (
            <OpportunityDetailPage
              opportunityId={selectedOpportunityId}
              onBack={() => handleNavigate('discover')}
              onNavigate={handleNavigate}
              onSave={handleSave}
              isSaved={savedIds.has(selectedOpportunityId)}
            />
          )}
          {currentPage === 'missing' && (
            <MissingPage
              onNavigate={handleNavigate}
              onViewOpportunity={handleViewOpportunity}
            />
          )}
          {currentPage === 'growth' && (
            <GrowthPage
              onNavigate={handleNavigate}
              onViewOpportunity={handleViewOpportunity}
            />
          )}
          {currentPage === 'saved' && (
            <SavedPage
              savedIds={savedIds}
              onViewOpportunity={handleViewOpportunity}
              onSave={handleSave}
            />
          )}
          {currentPage === 'applications' && (
            <ApplicationsPage onViewOpportunity={handleViewOpportunity} />
          )}
          {currentPage === 'search' && (
            <SearchPage
              onViewOpportunity={handleViewOpportunity}
              onSave={handleSave}
              savedIds={savedIds}
              onNavigateToAssistant={() => handleNavigate('assistant')}
            />
          )}
          {currentPage === 'assistant' && (
            <AssistantPage
              onNavigate={handleNavigate}
              onViewOpportunity={handleViewOpportunity}
            />
          )}
          {currentPage === 'notifications' && (
            <NotificationsPage
              onNavigate={handleNavigate}
              onViewOpportunity={handleViewOpportunity}
            />
          )}
          {currentPage === 'settings' && <SettingsPage />}
        </main>

        {showBottomNav && (
          <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
        )}
      </div>

      <Toast message={toast.message} visible={toast.visible} onClose={toast.close} />
    </div>
  );
}

export default App;
