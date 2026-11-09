import type { MatchType } from '@/types';

export const matchTypeConfig: Record<MatchType, { label: string; bg: string; text: string; border: string; dot: string }> = {
  'direct': {
    label: 'DIRECT MATCH',
    bg: 'bg-success-50',
    text: 'text-success-700',
    border: 'border-success-200',
    dot: 'bg-success-500',
  },
  'cross-domain': {
    label: 'CROSS-DOMAIN',
    bg: 'bg-secondary-50',
    text: 'text-secondary-700',
    border: 'border-secondary-200',
    dot: 'bg-secondary-500',
  },
  'growth': {
    label: 'GROWTH MATCH',
    bg: 'bg-accent-50',
    text: 'text-accent-700',
    border: 'border-accent-200',
    dot: 'bg-accent-500',
  },
};

export function getMatchColor(score: number): string {
  if (score >= 85) return '#22c55e';
  if (score >= 70) return '#6366f1';
  if (score >= 50) return '#f59e0b';
  return '#94a3b8';
}

export function getMatchLabel(score: number): string {
  if (score >= 85) return 'Strong Match';
  if (score >= 70) return 'Good Match';
  if (score >= 50) return 'Partial Match';
  return 'Weak Match';
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getDeadlineUrgency(daysLeft: number): { label: string; color: string } {
  if (daysLeft <= 3) return { label: `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`, color: 'text-danger-600' };
  if (daysLeft <= 7) return { label: `${daysLeft} days left`, color: 'text-warning-600' };
  return { label: `${daysLeft} days left`, color: 'text-surface-500' };
}
