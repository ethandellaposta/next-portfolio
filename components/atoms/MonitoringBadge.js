import { forwardRef, memo } from 'react';

const MonitoringBadge = forwardRef(
  (
    { type = 'performance', score = 0, showLabel = true, className = '' },
    ref
  ) => {
    const getScoreColor = score => {
      if (score >= 90) return 'text-green-500';
      if (score >= 80) return 'text-yellow-500';
      return 'text-red-500';
    };

    const getScoreGrade = score => {
      if (score >= 90) return 'A';
      if (score >= 80) return 'B';
      if (score >= 70) return 'C';
      return 'D';
    };

    const getLabel = type => {
      switch (type) {
        case 'performance':
          return 'Performance';
        case 'accessibility':
          return 'Accessibility';
        case 'seo':
          return 'SEO';
        case 'best-practices':
          return 'Best Practices';
        default:
          return 'Score';
      }
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border ${className}`}
        role="status"
        aria-label={`${getLabel(type)} score: ${score}`}
      >
        <span className={`font-bold ${getScoreColor(score)}`}>
          {getScoreGrade(score)}
        </span>
        {showLabel && (
          <span className="text-sm text-text-secondary">{getLabel(type)}</span>
        )}
        <span className={`text-sm font-medium ${getScoreColor(score)}`}>
          {score}
        </span>
      </div>
    );
  }
);

MonitoringBadge.displayName = 'MonitoringBadge';

export default memo(MonitoringBadge);
