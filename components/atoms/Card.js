import { forwardRef, memo } from 'react';

const Card = forwardRef(
  (
    { children, variant = 'default', hover = true, className = '', ...props },
    ref
  ) => {
    const baseClasses = `
    rounded-xl border transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent
  `;

    const variants = {
      default: `
      bg-surface border-border
      ${hover ? 'hover:border-border-hover hover:shadow-lg hover:-translate-y-1' : ''}
    `,
      elevated: `
      bg-surface border-border shadow-md
      ${hover ? 'hover:border-border-hover hover:shadow-xl hover:-translate-y-2' : ''}
    `,
      outlined: `
      bg-transparent border-border
      ${hover ? 'hover:border-border-hover hover:bg-surface' : ''}
    `,
      ghost: `
      bg-transparent border-transparent
      ${hover ? 'hover:bg-surface-hover' : ''}
    `,
    };

    const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${className}
  `
      .trim()
      .replace(/\s+/g, ' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default memo(Card);
