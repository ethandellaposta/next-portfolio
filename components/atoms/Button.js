import { forwardRef, memo } from 'react';

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      className = '',
      type = 'button',
      ariaLabel,
      ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
    inline-flex items-center justify-center
    font-medium text-center
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:transform-none
    disabled:focus:ring-offset-2
  `;

    const variants = {
      primary: `
      bg-accent text-white
      hover:bg-accent/90
      focus:ring-accent
      shadow-md hover:shadow-lg
      transform hover:-translate-y-px
    `,
      secondary: `
      bg-surface text-text-primary
      border border-border hover:border-border-hover
      focus:ring-accent
      hover:bg-surface-hover
      shadow-sm hover:shadow-md
      transform hover:-translate-y-px
    `,
      ghost: `
      text-text-secondary hover:text-text-primary
      focus:ring-accent
      hover:bg-surface-hover
    `,
      link: `
      text-accent hover:text-accent/80
      focus:ring-accent
      underline-offset-4 hover:underline
    `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
      xl: 'px-8 py-4 text-xl rounded-2xl',
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
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default memo(Button);
