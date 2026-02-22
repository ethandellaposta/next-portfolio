import { forwardRef, memo } from 'react';

const Badge = forwardRef(
  (
    { children, variant = 'default', size = 'md', className = '', ...props },
    ref
  ) => {
    const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-colors duration-200 ease-out
  `;

    const variants = {
      default: 'bg-surface-raised text-text-secondary border border-border',
      primary: 'bg-accent/10 text-accent border border-accent/20',
      success: 'bg-success/10 text-success border border-success/20',
      warning: 'bg-warning/10 text-warning border border-warning/20',
      error: 'bg-error/10 text-error border border-error/20',
      ghost: 'bg-transparent text-text-tertiary hover:text-text-secondary',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    };

    const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `
      .trim()
      .replace(/\s+/g, ' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default memo(Badge);
