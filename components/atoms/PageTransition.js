import { forwardRef, memo } from 'react';

const PageTransition = forwardRef(
  ({ children, className = '', state = 'entered', ...props }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className={`page-transition page-transition--${state} ${className}`}
          {...props}
        >
          {children}
        </div>
        <style jsx global>{`
          .page-transition {
            will-change: opacity, transform;
            transition:
              opacity 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              filter 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .page-transition--entering {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(4px);
          }

          .page-transition--entered {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }

          .page-transition--exiting {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
            filter: blur(3px);
            pointer-events: none;
          }

          @media (prefers-reduced-motion: reduce) {
            .page-transition {
              transition: opacity 150ms ease;
            }
            .page-transition--entering,
            .page-transition--exiting {
              transform: none;
              filter: none;
            }
          }
        `}</style>
      </>
    );
  }
);

PageTransition.displayName = 'PageTransition';

export default memo(PageTransition);
