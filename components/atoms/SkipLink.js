import { forwardRef, memo } from 'react';

const SkipLink = forwardRef(
  ({ href = '#main', children = 'Skip to main content' }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className="skip-link"
        aria-label={children}
        onClick={e => {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.focus();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {children}
      </a>
    );
  }
);

SkipLink.displayName = 'SkipLink';

export default memo(SkipLink);
