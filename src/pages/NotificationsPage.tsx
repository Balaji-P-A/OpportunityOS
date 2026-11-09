import { useState } from 'react';
import { Bell, AlertTriangle, Info, TrendingUp, Check, ArrowRight } from 'lucide-react';
import { initialNotifications } from '@/data/mockData';
import { EmptyState } from '@/components/ui/States';
import type { NotificationItem, NotificationPriority, PageId } from '@/types';

interface NotificationsPageProps {
  onNavigate: (page: PageId) => void;
  onViewOpportunity: (id: string) => void;
}

const priorityConfig: Record<NotificationPriority, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; label: string }> = {
  urgent: { icon: AlertTriangle, color: 'text-danger-600', bg: 'bg-danger-50', label: 'Urgent' },
  relevant: { icon: Info, color: 'text-primary-600', bg: 'bg-primary-50', label: 'Relevant' },
  growth: { icon: TrendingUp, color: 'text-accent-600', bg: 'bg-accent-50', label: 'Growth' },
};

export function NotificationsPage({ onViewOpportunity }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<NotificationPriority | 'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.priority === filter;
  });

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-surface-900">Notifications</h1>
          <p className="text-sm text-surface-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="btn-ghost text-sm">
            <Check className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide -mx-1 px-1">
        {([
          { id: 'all' as const, label: 'All' },
          { id: 'unread' as const, label: 'Unread' },
          { id: 'urgent' as const, label: 'Urgent' },
          { id: 'relevant' as const, label: 'Relevant' },
          { id: 'growth' as const, label: 'Growth' },
        ]).map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              filter === f.id ? 'bg-primary-600 text-white' : 'bg-white border border-surface-200 text-surface-600 hover:border-surface-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((notif) => {
            const config = priorityConfig[notif.priority];
            const Icon = config.icon;

            return (
              <div
                key={notif.id}
                className={`card p-4 flex items-start gap-3 transition-all hover:shadow-card ${!notif.read ? 'border-l-4 border-l-primary-500' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${config.color}`}>
                      {config.label}
                    </span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-primary-500" />
                    )}
                    <span className="text-xs text-surface-400 ml-auto">{notif.time}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-surface-900">{notif.title}</h3>
                  <p className="text-sm text-surface-500 mt-0.5">{notif.message}</p>

                  <div className="flex items-center gap-2 mt-3">
                    {notif.opportunityId && (
                      <button
                        onClick={() => onViewOpportunity(notif.opportunityId!)}
                        className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                      >
                        View opportunity
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                    {!notif.read && (
                      <button
                        onClick={() => markRead(notif.id)}
                        className="text-xs font-medium text-surface-400 hover:text-surface-600"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Bell className="w-8 h-8 text-surface-300" />}
          title="No notifications"
          description="You're all caught up. New notifications about opportunities and applications will appear here."
        />
      )}
    </div>
  );
}
