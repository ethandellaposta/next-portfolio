import { memo } from 'react';

const SKILL_ICONS = {
  react: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        transform="rotate(120 12 12)"
      />
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 8v8m0-8l8.5 11M16 8v8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 10h6M11 10v7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M17 10.5a1.5 1.5 0 0 0-1.5-1.5h-1a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 1-1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <path
        d="M12 2l9 5v10l-9 5-9-5V7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M12 7v10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8 9.5l4 2.5 4-2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  cpp: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <circle
        cx="11"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 9a4 4 0 1 0 0 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 10v4M15 12h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M21 10v4M19 12h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  go: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <path
        d="M4 12c0-3.3 3.6-6 8-6s8 2.7 8 6-3.6 6-8 6-8-2.7-8-6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="9" cy="10.5" r="1" fill="currentColor" />
      <circle cx="15" cy="10.5" r="1" fill="currentColor" />
      <path
        d="M9.5 14c1 1 4 1 5 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  graphql: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <polygon
        points="12,2 21,7 21,17 12,22 3,17 3,7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="2" r="1.5" fill="currentColor" />
      <circle cx="21" cy="7" r="1.5" fill="currentColor" />
      <circle cx="21" cy="17" r="1.5" fill="currentColor" />
      <circle cx="12" cy="22" r="1.5" fill="currentColor" />
      <circle cx="3" cy="17" r="1.5" fill="currentColor" />
      <circle cx="3" cy="7" r="1.5" fill="currentColor" />
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <ellipse
        cx="12"
        cy="6"
        rx="8"
        ry="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <path
        d="M6 15l3-9h1l3 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M7.5 12h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M15 6l2 6 2-6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M3 18c3 2 6 2.5 9 2.5s6-.5 9-2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <rect
        x="3"
        y="10"
        width="18"
        height="9"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="5"
        y="12"
        width="3"
        height="2.5"
        rx="0.5"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="9.5"
        y="12"
        width="3"
        height="2.5"
        rx="0.5"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="14"
        y="12"
        width="3"
        height="2.5"
        rx="0.5"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="9.5"
        y="7"
        width="3"
        height="2.5"
        rx="0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M1 13c1-1 2-1.5 3-1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  kubernetes: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line
        x1="12"
        y1="3"
        x2="12"
        y2="9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="15"
        x2="12"
        y2="21"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="3.5"
        y1="7.5"
        x2="9.5"
        y2="10.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="14.5"
        y1="13.5"
        x2="20.5"
        y2="16.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="3.5"
        y1="16.5"
        x2="9.5"
        y2="13.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="14.5"
        y1="10.5"
        x2="20.5"
        y2="7.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  ),
  linux: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <ellipse
        cx="12"
        cy="8"
        rx="4"
        ry="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="10.5" cy="7" r="0.8" fill="currentColor" />
      <circle cx="13.5" cy="7" r="0.8" fill="currentColor" />
      <path
        d="M10.5 9.5c.5.5 2.5.5 3 0"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 13c-2 2-3 5-2 7h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 13c2 2 3 5 2 7h-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  radar: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <line
        x1="12"
        y1="12"
        x2="18"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 12l2-8"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  webgl: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <polygon
        points="12,3 21,18 3,18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polygon
        points="12,8 17,16 7,16"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  feathers: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <path
        d="M20 4L4 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18 8c-3-1-6 0-8 2l6-1z"
        fill="currentColor"
        opacity="0.3"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M14 12c-3-1-6 0-8 2l6-1z"
        fill="currentColor"
        opacity="0.3"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  ),
  grpc: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <circle
        cx="6"
        cy="6"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="18"
        cy="6"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="6"
        cy="18"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="18"
        cy="18"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <line
        x1="8.5"
        y1="6"
        x2="15.5"
        y2="6"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <line
        x1="6"
        y1="8.5"
        x2="6"
        y2="15.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <line
        x1="18"
        y1="8.5"
        x2="18"
        y2="15.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <line
        x1="8.5"
        y1="18"
        x2="15.5"
        y2="18"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
    </svg>
  ),
  protobuf: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 8h8M8 12h6M8 16h4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="18" cy="8" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="12" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  jenkins: (
    <svg viewBox="0 0 24 24" className="skillIcon">
      <circle
        cx="12"
        cy="10"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="10" cy="9" r="1" fill="currentColor" />
      <circle cx="14" cy="9" r="1" fill="currentColor" />
      <path
        d="M9 12.5c1 1.5 5 1.5 6 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 17v3M9 21h6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M7 4c-1-1.5 0-3 2-3M17 4c1-1.5 0-3-2-3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
};

function SkillChip({ label, icon, index }) {
  return (
    <span className="skillChip" style={{ '--chip-delay': `${index * 60}ms` }}>
      {SKILL_ICONS[icon] && SKILL_ICONS[icon]}
      <span className="skillLabel">{label}</span>
    </span>
  );
}

export default memo(SkillChip);
