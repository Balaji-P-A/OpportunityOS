import { useCountUp } from '@/hooks/useAnimations';

interface StrengthBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  animate?: boolean;
  compact?: boolean;
}

export function StrengthBar({ value, max = 100, label, color, animate = true, compact = false }: StrengthBarProps) {
  const animatedValue = useCountUp(value, animate ? 600 : 0);
  const percentage = (animatedValue / max) * 100;
  const barColor = color || (percentage >= 75 ? 'bg-success-500' : percentage >= 50 ? 'bg-primary-500' : 'bg-warning-500');

  return (
    <div className={compact ? 'space-y-1' : 'space-y-1.5'}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-surface-700">{label}</span>
          <span className="font-mono text-xs font-semibold text-surface-600">{animatedValue}%</span>
        </div>
      )}
      <div className={`w-full ${compact ? 'h-1.5' : 'h-2'} bg-surface-100 rounded-full overflow-hidden`}>
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
