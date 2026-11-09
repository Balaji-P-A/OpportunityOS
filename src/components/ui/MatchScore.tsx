import { useCountUp } from '@/hooks/useAnimations';
import { getMatchColor, getMatchLabel } from '@/lib/matchUtils';

interface MatchScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  animate?: boolean;
}

export function MatchScore({ score, size = 'md', showLabel = false, animate = true }: MatchScoreProps) {
  const animatedScore = useCountUp(score, animate ? 800 : 0);
  const color = getMatchColor(score);
  const label = getMatchLabel(score);

  const dimensions = {
    sm: { ring: 40, stroke: 3, text: 'text-xs', label: 'text-[10px]' },
    md: { ring: 56, stroke: 4, text: 'text-sm', label: 'text-[10px]' },
    lg: { ring: 80, stroke: 5, text: 'text-lg', label: 'text-xs' },
    xl: { ring: 120, stroke: 6, text: 'text-2xl', label: 'text-sm' },
  };
  const dim = dimensions[size];
  const radius = (dim.ring - dim.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: dim.ring, height: dim.ring }}>
        <svg width={dim.ring} height={dim.ring} className="transform -rotate-90">
          <circle
            cx={dim.ring / 2}
            cy={dim.ring / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={dim.stroke}
            className="text-surface-100"
          />
          <circle
            cx={dim.ring / 2}
            cy={dim.ring / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={dim.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: animate ? 'stroke-dashoffset 0.1s linear' : 'none' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono font-semibold ${dim.text}`} style={{ color }}>
            {animatedScore}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={`font-medium ${dim.label}`} style={{ color }}>
          {label}
        </span>
      )}
    </div>
  );
}
