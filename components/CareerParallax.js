import { useEffect, useRef, useState, useCallback, memo } from 'react'
const JOBS = [
  {
    id: 'src2',
    date: 'Dec 2024 — Present',
    role: 'Senior Software Engineer',
    company: 'SRC',
    location: 'Remote',
    accent: 'hsl(230, 80%, 65%)',
    description:
      'Building mission-critical radar software, collaborating across firmware, systems, and hardware teams.',
    projects: [
      {
        title: 'Radar Signal Processing Pipeline',
        desc: 'Developed RX dwell scheduling and exposure processing algorithms for real-time radar data acquisition.',
        tags: ['C++', 'Slurm', 'Linux'],
        stats: [
          { label: 'Dwell latency', value: '<5ms' },
          { label: 'Throughput', value: '2.4Gbps' }
        ],
        visual: 'radar'
      },
      {
        title: 'SBC/FPGA Integration',
        desc: 'Partnered with firmware team on single-board computer and FPGA chip setup, writing hardware-specific drivers and interfaces.',
        tags: ['SQL', 'Bamboo', 'Podman'],
        stats: [
          { label: 'Boot time', value: '-45%' },
          { label: 'Reliability', value: '99.99%' }
        ],
        visual: 'chip'
      }
    ]
  },
  {
    id: 'src1',
    date: 'Jan 2024 — Dec 2024',
    role: 'Software Engineer',
    company: 'SRC',
    location: 'Remote',
    accent: 'hsl(260, 70%, 62%)',
    description: 'Translated drone system ICDs to a shared mission system messaging framework.',
    projects: [
      {
        title: 'Mission Messaging Framework',
        desc: 'Developed message translators for drone ICDs including track, position, and capabilities messages to unified mission system format.',
        tags: ['C++', 'Jenkins', 'Kubernetes'],
        stats: [
          { label: 'Message types', value: '24+' },
          { label: 'Translation latency', value: '<1ms' }
        ],
        visual: 'messages'
      },
      {
        title: 'ICD Integration Layer',
        desc: 'Built adapters bridging multiple drone platform ICDs to standardized messaging protocols for cross-system interoperability.',
        tags: ['C++', 'Protobuf', 'Linux'],
        stats: [
          { label: 'Platforms integrated', value: '5' },
          { label: 'Message throughput', value: '10k/s' }
        ],
        visual: 'drone'
      }
    ]
  },
  {
    id: 'yumi',
    date: 'Feb 2021 — May 2023',
    role: 'Full Stack Developer',
    company: 'Yumi',
    location: 'Los Angeles',
    accent: 'hsl(320, 65%, 58%)',
    description:
      'Led full-stack development during a major pivot from baby food subscriptions to a broader e-commerce platform.',
    projects: [
      {
        title: 'E-Commerce Platform',
        desc: 'Built the entire storefront from scratch — product pages, cart, checkout, subscriptions, and admin tools.',
        tags: ['Next.js', 'Feathers.js', 'MySQL', 'Stripe'],
        stats: [
          { label: 'Revenue lift', value: '+120%' },
          { label: 'Page speed', value: '95/100' }
        ],
        visual: 'cart'
      },
      {
        title: 'Subscription Engine',
        desc: 'Designed a flexible subscription system supporting weekly, biweekly, and monthly delivery cadences with skip/pause.',
        tags: ['TypeScript', 'MySQL', 'AWS Lambda'],
        stats: [
          { label: 'Churn reduction', value: '-28%' },
          { label: 'Active subs', value: '15k+' }
        ],
        visual: 'calendar'
      }
    ]
  },
  {
    id: 'acquia',
    date: 'Jun 2020 — Feb 2021',
    role: 'Associate Software Engineer',
    company: 'Acquia',
    location: 'Boston',
    accent: 'hsl(160, 60%, 50%)',
    description:
      'Piloted a company-wide unified UI initiative. Built apps, libraries, and APIs across the stack.',
    projects: [
      {
        title: 'Unified UI Framework',
        desc: 'Created a cross-product component library that standardized the UI across 6 enterprise products.',
        tags: ['React', 'GraphQL', 'Nest.js'],
        stats: [
          { label: 'Products unified', value: '6' },
          { label: 'Dev velocity', value: '+35%' }
        ],
        visual: 'components'
      },
      {
        title: 'Internal API Gateway',
        desc: 'Built a Go-based API gateway handling auth, routing, and rate limiting for internal microservices.',
        tags: ['Go', 'Docker', 'gRPC'],
        stats: [
          { label: 'Services routed', value: '12' },
          { label: 'Latency', value: '<2ms' }
        ],
        visual: 'network'
      }
    ]
  },
  {
    id: 'urspace',
    date: 'Dec 2018 — Jul 2020',
    role: 'Full Stack Software Engineer',
    company: 'urspace',
    location: 'Los Angeles',
    accent: 'hsl(40, 80%, 55%)',
    description:
      'Built a platform for hosting free personal websites with LinkedIn, GitHub, and Medium integrations.',
    projects: [
      {
        title: 'Website Builder',
        desc: 'Drag-and-drop website builder with live preview, custom domains, and social media auto-import.',
        tags: ['Next.js', 'Node.js', 'MySQL'],
        stats: [
          { label: 'Sites created', value: '8k+' },
          { label: 'Avg build time', value: '<3min' }
        ],
        visual: 'browser'
      }
    ]
  }
]

// Scroll-driven SVG visuals for each project type
const ProjectVisual = memo(function ProjectVisual({ type, progress, accent }) {
  const p = Math.max(0.1, Math.min(1, progress))

  // ── Radar: rotating sweep with blips ──
  if (type === 'radar') {
    // Staggered fade helpers
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    const ringCirc = (r) => 2 * Math.PI * r
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        <defs>
          <clipPath id="radarClip">
            <circle cx="80" cy="50" r="38" />
          </clipPath>
        </defs>
        {/* Concentric rings — line-draw entrance */}
        {[14, 26, 38].map((r, i) => {
          const circ = ringCirc(r)
          const drawP = fade(i * 0.08, 0.5)
          return (
            <circle
              key={i}
              cx="80"
              cy="50"
              r={r}
              fill="none"
              stroke={accent}
              strokeWidth="0.5"
              opacity={0.12 + i * 0.04}
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - drawP)}
            />
          )
        })}
        {/* Cross hairs — fade in */}
        <line
          x1="42"
          y1="50"
          x2="118"
          y2="50"
          stroke={accent}
          strokeWidth="0.3"
          opacity={0.15 * fade(0.15)}
        />
        <line x1="80" y1="12" x2="80" y2="88" stroke={accent} strokeWidth="0.3" opacity={0.15 * fade(0.2)} />
        {/* Sweep line — fades in, rotates */}
        <g opacity={fade(0.25, 0.4)}>
          <line
            x1="80"
            y1="50"
            x2="118"
            y2="50"
            stroke={accent}
            strokeWidth="1.2"
            opacity={0.6}
            clipPath="url(#radarClip)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 80 50"
              to="360 80 50"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
          {/* Sweep trail */}
          <path
            d={`M 80,50 L 118,50 A 38,38 0 0,0 ${80 + 38 * Math.cos(-0.5)},${50 + 38 * Math.sin(-0.5)} Z`}
            fill={accent}
            opacity={0.08}
            clipPath="url(#radarClip)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 80 50"
              to="360 80 50"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        </g>
        {/* Blips — fade in at full size */}
        {[
          { x: 95, y: 38, d: 0.35 },
          { x: 68, y: 35, d: 0.5 },
          { x: 100, y: 60, d: 0.7 },
          { x: 72, y: 62, d: 0.45 }
        ].map((b, i) => {
          const bp = fade(b.d, 0.2)
          return (
            <circle key={i} cx={b.x} cy={b.y} r="1.5" fill={accent} opacity={0.5 * bp}>
              <animate
                attributeName="opacity"
                values="0.5;0.2;0.5"
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
            </circle>
          )
        })}
        {/* Outer ring — line-draw */}
        <circle
          cx="80"
          cy="50"
          r="38"
          fill="none"
          stroke={accent}
          strokeWidth="1"
          opacity={0.25}
          strokeDasharray={ringCirc(38)}
          strokeDashoffset={ringCirc(38) * (1 - fade(0, 0.6))}
        />
      </svg>
    )
  }

  // ── Chip: FPGA/SBC with circuit traces ──
  if (type === 'chip') {
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        {/* Main chip body — line-draw */}
        <rect
          x="50"
          y="25"
          width="60"
          height="50"
          rx="4"
          fill="none"
          stroke={accent}
          strokeWidth="1"
          opacity={0.7}
          strokeDasharray="220"
          strokeDashoffset={220 * (1 - fade(0, 0.5))}
        />
        {/* Inner die — fade in */}
        <rect x="62" y="35" width="36" height="30" rx="2" fill={accent} opacity={0.14 * fade(0.15, 0.4)} />
        {/* Pin traces — left, fade in staggered */}
        {[0, 1, 2, 3].map((i) => {
          const y = 32 + i * 11
          const op = fade(0.1 + i * 0.08, 0.3)
          return (
            <g key={`l${i}`} opacity={op}>
              <line x1="32" y1={y} x2="50" y2={y} stroke={accent} strokeWidth="0.7" opacity={0.3} />
              <rect x="30" y={y - 1.5} width="3" height="3" rx="0.5" fill={accent} opacity={0.4} />
            </g>
          )
        })}
        {/* Pin traces — right */}
        {[0, 1, 2, 3].map((i) => {
          const y = 32 + i * 11
          const op = fade(0.15 + i * 0.08, 0.3)
          return (
            <g key={`r${i}`} opacity={op}>
              <line x1="110" y1={y} x2="128" y2={y} stroke={accent} strokeWidth="0.7" opacity={0.3} />
              <rect x="127" y={y - 1.5} width="3" height="3" rx="0.5" fill={accent} opacity={0.4} />
            </g>
          )
        })}
        {/* Pin traces — top */}
        {[0, 1, 2].map((i) => {
          const x = 62 + i * 14
          return (
            <line
              key={`t${i}`}
              x1={x}
              y1="13"
              x2={x}
              y2="25"
              stroke={accent}
              strokeWidth="0.7"
              opacity={0.3 * fade(0.2 + i * 0.08, 0.3)}
            />
          )
        })}
        {/* Pin traces — bottom */}
        {[0, 1, 2].map((i) => {
          const x = 62 + i * 14
          return (
            <line
              key={`b${i}`}
              x1={x}
              y1="75"
              x2={x}
              y2="87"
              stroke={accent}
              strokeWidth="0.7"
              opacity={0.3 * fade(0.25 + i * 0.08, 0.3)}
            />
          )
        })}
        {/* Internal circuit paths — line-draw */}
        <polyline
          points="68,42 75,42 75,48 82,48"
          fill="none"
          stroke={accent}
          strokeWidth="0.5"
          opacity={0.25}
          strokeDasharray="40"
          strokeDashoffset={40 * (1 - fade(0.3, 0.5))}
        />
        <polyline
          points="90,42 85,42 85,55 78,55"
          fill="none"
          stroke={accent}
          strokeWidth="0.5"
          opacity={0.25}
          strokeDasharray="40"
          strokeDashoffset={40 * (1 - fade(0.35, 0.5))}
        />
        {/* Pulsing core — fade in */}
        <circle cx="80" cy="50" r="3" fill={accent} opacity={0.4 * fade(0.4, 0.3)}>
          <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    )
  }

  // ── Messages: packets flowing between nodes ──
  if (type === 'messages') {
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        {/* Source node — line-draw */}
        <rect
          x="10"
          y="30"
          width="30"
          height="40"
          rx="4"
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          opacity={0.6}
          strokeDasharray="140"
          strokeDashoffset={140 * (1 - fade(0, 0.4))}
        />
        <rect x="16" y="38" width="18" height="2.5" rx="1" fill={accent} opacity={0.3 * fade(0.15, 0.3)} />
        <rect x="16" y="44" width="12" height="2.5" rx="1" fill={accent} opacity={0.2 * fade(0.2, 0.3)} />
        <rect x="16" y="50" width="15" height="2.5" rx="1" fill={accent} opacity={0.25 * fade(0.25, 0.3)} />
        {/* Destination node — line-draw */}
        <rect
          x="120"
          y="30"
          width="30"
          height="40"
          rx="4"
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          opacity={0.6}
          strokeDasharray="140"
          strokeDashoffset={140 * (1 - fade(0.05, 0.4))}
        />
        <rect x="126" y="38" width="18" height="2.5" rx="1" fill={accent} opacity={0.3 * fade(0.2, 0.3)} />
        <rect x="126" y="44" width="12" height="2.5" rx="1" fill={accent} opacity={0.2 * fade(0.25, 0.3)} />
        {/* Connection line — line-draw */}
        <line
          x1="40"
          y1="50"
          x2="120"
          y2="50"
          stroke={accent}
          strokeWidth="0.5"
          opacity={0.15}
          strokeDasharray="80"
          strokeDashoffset={80 * (1 - fade(0.1, 0.5))}
        />
        {/* Translator box — line-draw */}
        <rect
          x="62"
          y="38"
          width="36"
          height="24"
          rx="3"
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          opacity={0.4}
          strokeDasharray="120"
          strokeDashoffset={120 * (1 - fade(0.15, 0.4))}
        />
        <text x="80" y="53" textAnchor="middle" fill={accent} fontSize="5" opacity={0.5 * fade(0.3, 0.3)}>
          ICD
        </text>
        {/* Flowing message packets — fade in after structure */}
        <g opacity={fade(0.4, 0.3)}>
          {[0, 1, 2].map((i) => (
            <rect key={i} width="8" height="5" rx="1" fill={accent} opacity={0}>
              <animateMotion
                path="M 40,50 L 62,50"
                dur="1.5s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.5;0.5;0"
                dur="1.5s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={`o${i}`} width="8" height="5" rx="1" fill={accent} opacity={0}>
              <animateMotion
                path="M 98,50 L 120,50"
                dur="1.5s"
                begin={`${i * 0.5 + 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.5;0.5;0"
                dur="1.5s"
                begin={`${i * 0.5 + 0.3}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>
      </svg>
    )
  }

  // ── Drone: quadcopter with signal lines to adapters ──
  if (type === 'drone') {
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        {/* Drone body — line-draw */}
        <rect
          x="65"
          y="20"
          width="30"
          height="16"
          rx="4"
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          opacity={0.7}
          strokeDasharray="92"
          strokeDashoffset={92 * (1 - fade(0, 0.4))}
        />
        {/* Propeller arms — fade in staggered */}
        {[
          { x: 60, y: 22 },
          { x: 100, y: 22 },
          { x: 60, y: 34 },
          { x: 100, y: 34 }
        ].map((arm, i) => {
          const op = fade(0.1 + i * 0.06, 0.3)
          return (
            <g key={i} opacity={op}>
              <line
                x1={arm.x < 80 ? 65 : 95}
                y1={arm.y}
                x2={arm.x}
                y2={arm.y}
                stroke={accent}
                strokeWidth="0.6"
                opacity={0.3}
              />
              <circle
                cx={arm.x}
                cy={arm.y}
                r="5"
                fill="none"
                stroke={accent}
                strokeWidth="0.5"
                opacity={0.2}
                strokeDasharray="2 2"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${arm.x} ${arm.y}`}
                  to={`360 ${arm.x} ${arm.y}`}
                  dur={`${0.5 + i * 0.1}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )
        })}
        {/* Signal waves — line-draw */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${74 + i * 6},38 Q ${74 + i * 6},${48 + i * 4} 80,${55 + i * 6}`}
            fill="none"
            stroke={accent}
            strokeWidth="0.5"
            opacity={0.2}
            strokeDasharray="20"
            strokeDashoffset={20 * (1 - fade(0.2 + i * 0.06, 0.4))}
          />
        ))}
        {/* Adapter boxes — fade in staggered */}
        {[0, 1, 2, 3, 4].map((i) => {
          const op = fade(0.3 + i * 0.06, 0.3)
          const x = 22 + i * 26
          return (
            <g key={i} opacity={op}>
              <rect
                x={x}
                y="72"
                width="20"
                height="14"
                rx="2"
                fill="none"
                stroke={accent}
                strokeWidth="0.6"
                opacity={0.5}
              />
              <rect x={x + 3} y="76" width="14" height="2" rx="1" fill={accent} opacity={0.25} />
              <rect x={x + 3} y="80" width="10" height="2" rx="1" fill={accent} opacity={0.15} />
            </g>
          )
        })}
        {/* Connection line — fade in */}
        <line
          x1="80"
          y1="65"
          x2="80"
          y2="72"
          stroke={accent}
          strokeWidth="0.4"
          opacity={0.2 * fade(0.25, 0.3)}
          strokeDasharray="2 2"
        />
      </svg>
    )
  }

  // ── Cart: e-commerce storefront ──
  if (type === 'cart') {
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        {/* Browser frame — line-draw */}
        <rect
          x="15"
          y="8"
          width="130"
          height="84"
          rx="6"
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          opacity={0.4}
          strokeDasharray="428"
          strokeDashoffset={428 * (1 - fade(0, 0.5))}
        />
        {/* URL bar — fade in */}
        <rect
          x="15"
          y="8"
          width="130"
          height="12"
          rx="6"
          fill="none"
          stroke={accent}
          strokeWidth="0.5"
          opacity={0.15 * fade(0.1, 0.3)}
        />
        <circle cx="23" cy="14" r="2" fill={accent} opacity={0.2 * fade(0.12, 0.2)} />
        <circle cx="30" cy="14" r="2" fill={accent} opacity={0.15 * fade(0.15, 0.2)} />
        <circle cx="37" cy="14" r="2" fill={accent} opacity={0.1 * fade(0.18, 0.2)} />
        <rect x="48" y="12" width="50" height="4" rx="2" fill={accent} opacity={0.1 * fade(0.15, 0.3)} />
        {/* Product grid — staggered fade */}
        {[0, 1, 2].map((col) => {
          const op = fade(0.15 + col * 0.1, 0.35)
          const x = 22 + col * 40
          return (
            <g key={col} opacity={op}>
              <rect x={x} y="28" width="32" height="24" rx="3" fill={accent} opacity={0.06} />
              <rect x={x + 4} y="56" width="24" height="2.5" rx="1" fill={accent} opacity={0.25} />
              <rect x={x + 4} y="61" width="16" height="2" rx="1" fill={accent} opacity={0.15} />
              <rect x={x + 4} y="67" width="20" height="5" rx="2" fill={accent} opacity={0.35} />
            </g>
          )
        })}
        {/* Cart icon — fade in */}
        <g opacity={fade(0.5, 0.3)}>
          <path
            d="M 125,28 L 130,28 L 137,44 L 122,44 Z"
            fill="none"
            stroke={accent}
            strokeWidth="0.7"
            opacity={0.4}
          />
          <circle cx="125" cy="48" r="1.5" fill={accent} opacity={0.4} />
          <circle cx="134" cy="48" r="1.5" fill={accent} opacity={0.4} />
          <text x="130" y="39" textAnchor="middle" fill={accent} fontSize="6" opacity={0.5}>
            3
          </text>
        </g>
      </svg>
    )
  }

  // ── Calendar: subscription with recurring markers ──
  if (type === 'calendar') {
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        {/* Calendar frame — line-draw */}
        <rect
          x="20"
          y="10"
          width="120"
          height="80"
          rx="6"
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          opacity={0.4}
          strokeDasharray="400"
          strokeDashoffset={400 * (1 - fade(0, 0.5))}
        />
        {/* Header — fade in */}
        <rect x="20" y="10" width="120" height="16" rx="6" fill={accent} opacity={0.08 * fade(0.1, 0.3)} />
        <rect x="55" y="15" width="50" height="3" rx="1.5" fill={accent} opacity={0.3 * fade(0.15, 0.3)} />
        {/* Day grid — staggered fade, row by row */}
        {Array.from({ length: 28 }, (_, i) => {
          const col = i % 7,
            row = Math.floor(i / 7)
          const op = fade(0.15 + row * 0.1 + col * 0.015, 0.25)
          const isDelivery = [2, 9, 16, 23].includes(i)
          const x = 26 + col * 16,
            y = 32 + row * 14
          return (
            <g key={i} opacity={op}>
              <rect
                x={x}
                y={y}
                width="12"
                height="10"
                rx="2"
                fill={isDelivery ? accent : 'none'}
                stroke={accent}
                strokeWidth={isDelivery ? '0' : '0.4'}
                opacity={isDelivery ? 0.2 : 0.1}
              />
              {isDelivery && (
                <text x={x + 6} y={y + 7} textAnchor="middle" fill={accent} fontSize="4" opacity={0.6}>
                  ✓
                </text>
              )}
            </g>
          )
        })}
        {/* Recurring arrow — line-draw */}
        <path
          d="M 30,82 C 50,78 110,78 130,82"
          fill="none"
          stroke={accent}
          strokeWidth="0.5"
          opacity={0.2}
          strokeDasharray="100"
          strokeDashoffset={100 * (1 - fade(0.5, 0.4))}
        />
      </svg>
    )
  }

  // ── Components: UI component grid ──
  if (type === 'components') {
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    const perim = 2 * (38 + 36)
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const col = i % 3,
            row = Math.floor(i / 3)
          const d = i * 0.1
          const drawP = fade(d, 0.4)
          const contentP = fade(d + 0.15, 0.3)
          return (
            <g key={i} transform={`translate(${15 + col * 46}, ${12 + row * 44})`}>
              {/* Card outline — line-draw */}
              <rect
                width="38"
                height="36"
                rx="6"
                fill="none"
                stroke={accent}
                strokeWidth="0.8"
                opacity={0.6}
                strokeDasharray={perim}
                strokeDashoffset={perim * (1 - drawP)}
              />
              {/* Inner content — fade in */}
              <rect x="6" y="8" width="20" height="3" rx="1.5" fill={accent} opacity={0.4 * contentP} />
              <rect x="6" y="15" width="14" height="3" rx="1.5" fill={accent} opacity={0.2 * contentP} />
              <circle
                cx="30"
                cy="26"
                r="4"
                fill="none"
                stroke={accent}
                strokeWidth="0.6"
                opacity={0.3 * contentP}
              />
            </g>
          )
        })}
      </svg>
    )
  }

  // ── Network: API gateway hub-spoke ──
  if (type === 'network') {
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    const hubCirc = 2 * Math.PI * 14
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        {/* Central hub — line-draw */}
        <circle
          cx="80"
          cy="50"
          r="14"
          fill="none"
          stroke={accent}
          strokeWidth="1.2"
          opacity={0.6}
          strokeDasharray={hubCirc}
          strokeDashoffset={hubCirc * (1 - fade(0, 0.4))}
        />
        <circle cx="80" cy="50" r="5" fill={accent} opacity={0.4 * fade(0.1, 0.3)} />
        <text x="80" y="53" textAnchor="middle" fill={accent} fontSize="5" opacity={0.5 * fade(0.15, 0.3)}>
          GW
        </text>
        {/* Spoke services — staggered fade */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
          const dist = 34
          const x = 80 + Math.cos(angle) * dist
          const y = 50 + Math.sin(angle) * dist
          const op = fade(0.15 + i * 0.08, 0.35)
          return (
            <g key={i} opacity={op}>
              <line x1={80} y1={50} x2={x} y2={y} stroke={accent} strokeWidth="0.6" opacity={0.25} />
              <rect
                x={x - 8}
                y={y - 6}
                width="16"
                height="12"
                rx="3"
                fill="none"
                stroke={accent}
                strokeWidth="0.7"
                opacity={0.35}
              />
              <rect x={x - 5} y={y - 2} width="10" height="2" rx="1" fill={accent} opacity={0.2} />
            </g>
          )
        })}
        {/* Orbiting request dot — fade in */}
        <circle r="1.5" fill={accent} opacity={0.6 * fade(0.6, 0.3)}>
          <animateMotion
            path={`M ${80 + 34},50 A 34,34 0 1 1 ${80 + 33.99},50`}
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    )
  }

  // ── Browser: website builder with layers ──
  if (type === 'browser') {
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        {/* Browser chrome — line-draw */}
        <rect
          x="15"
          y="8"
          width="130"
          height="84"
          rx="6"
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          opacity={0.4}
          strokeDasharray="428"
          strokeDashoffset={428 * (1 - fade(0, 0.5))}
        />
        <rect x="15" y="8" width="130" height="12" rx="6" fill={accent} opacity={0.05 * fade(0.1, 0.3)} />
        <circle cx="23" cy="14" r="2" fill={accent} opacity={0.2 * fade(0.12, 0.2)} />
        <circle cx="30" cy="14" r="2" fill={accent} opacity={0.15 * fade(0.15, 0.2)} />
        <circle cx="37" cy="14" r="2" fill={accent} opacity={0.1 * fade(0.18, 0.2)} />
        {/* Sidebar — fade in */}
        <rect x="15" y="20" width="28" height="72" fill={accent} opacity={0.04 * fade(0.15, 0.3)} />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="20"
            y={28 + i * 14}
            width="18"
            height="3"
            rx="1.5"
            fill={accent}
            opacity={0.2 * fade(0.15 + i * 0.08, 0.3)}
          />
        ))}
        {/* Content blocks — staggered fade */}
        {[0, 1, 2].map((i) => {
          const op = fade(0.2 + i * 0.12, 0.35)
          const y = 26 + i * 22
          return (
            <g key={i} opacity={op}>
              <rect
                x="48"
                y={y}
                width="90"
                height="18"
                rx="3"
                fill="none"
                stroke={accent}
                strokeWidth="0.6"
                opacity={0.4}
              />
              <rect x="52" y={y + 4} width="50" height="3" rx="1.5" fill={accent} opacity={0.25} />
              <rect x="52" y={y + 10} width="35" height="2.5" rx="1" fill={accent} opacity={0.15} />
            </g>
          )
        })}
        {/* Drop zone — fade in */}
        <g opacity={fade(0.6, 0.3)}>
          <rect
            x="48"
            y="70"
            width="90"
            height="18"
            rx="3"
            fill="none"
            stroke={accent}
            strokeWidth="0.6"
            opacity={0.3}
            strokeDasharray="3 3"
          />
          <text x="93" y="82" textAnchor="middle" fill={accent} fontSize="5" opacity={0.3}>
            Drop here
          </text>
        </g>
      </svg>
    )
  }

  // ── Default fallback: generic layers ──
  {
    const fade = (delay, dur = 0.3) => Math.max(0, Math.min(1, (p - delay) / dur))
    const perim = 2 * (110 + 18)
    return (
      <svg viewBox="0 0 160 100" className="pv-svg">
        {[0, 1, 2].map((i) => {
          const y = 70 - i * 22
          const drawP = fade(i * 0.15, 0.4)
          const contentP = fade(i * 0.15 + 0.2, 0.3)
          return (
            <g key={i}>
              {/* Layer outline — line-draw */}
              <rect
                x="25"
                y={y}
                width="110"
                height="18"
                rx="4"
                fill="none"
                stroke={accent}
                strokeWidth="0.8"
                opacity={0.6}
                strokeDasharray={perim}
                strokeDashoffset={perim * (1 - drawP)}
              />
              {/* Inner bars — fade in */}
              <rect x="32" y={y + 5} width="60" height="3" rx="1.5" fill={accent} opacity={0.3 * contentP} />
              <rect x="32" y={y + 11} width="40" height="2" rx="1" fill={accent} opacity={0.15 * contentP} />
            </g>
          )
        })}
      </svg>
    )
  }
})

export default function CareerParallax() {
  const containerRef = useRef(null)
  const [scrollData, setScrollData] = useState({
    jobIndex: 0,
    jobProgress: 0,
    projectIndex: 0,
    projectProgress: 0
  })

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const containerTop = -rect.top
    const containerHeight = container.scrollHeight - window.innerHeight

    if (containerHeight <= 0) return

    // Clamp to [0,1] so the first and last states always render
    const totalProgress = Math.max(0, Math.min(1, containerTop / containerHeight))
    const jobCount = JOBS.length
    const perJob = 1 / jobCount
    const jobIndex = Math.min(Math.floor(totalProgress / perJob), jobCount - 1)
    const jobProgress = Math.min(1, (totalProgress - jobIndex * perJob) / perJob)

    const job = JOBS[jobIndex]
    const projCount = job.projects.length
    const perProj = 1 / projCount
    const projectIndex = Math.min(Math.floor(jobProgress / perProj), projCount - 1)
    const projectProgress = Math.min(1, (jobProgress - projectIndex * perProj) / perProj)

    setScrollData((prev) => {
      if (
        prev.jobIndex === jobIndex &&
        prev.projectIndex === projectIndex &&
        Math.abs(prev.projectProgress - projectProgress) < 0.005 &&
        Math.abs(prev.jobProgress - jobProgress) < 0.005
      )
        return prev
      return { jobIndex, jobProgress, projectIndex, projectProgress }
    })
  }, [])

  useEffect(() => {
    let ticking = false
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  const { jobIndex, jobProgress, projectIndex, projectProgress } = scrollData
  const activeJob = JOBS[jobIndex]
  const activeProject = activeJob.projects[projectIndex]

  // SVG progress line offset (scroll drives the stroke)
  const totalJobs = JOBS.length
  const globalProgress = (jobIndex + jobProgress) / totalJobs

  return (
    <div
      ref={containerRef}
      className="cp-container"
      data-accent={activeJob.accent}
      style={{ height: `${JOBS.reduce((sum, j) => sum + j.projects.length, 0) * 60 + 40}vh` }}
    >
      <div className="cp-sticky">
        {/* Left: Job info */}
        <div className="cp-left">
          {/* Timeline — line + dots */}
          <div className="cp-timeline">
            <div className="cp-progressLine">
              <div
                className="cp-progressFill"
                style={{
                  height: `${globalProgress * 100}%`
                }}
              />
            </div>
            <div className="cp-dots">
              {JOBS.map((job, i) => (
                <div
                  key={job.id}
                  className={`cp-dot ${i === jobIndex ? 'cp-dotActive' : ''} ${i < jobIndex ? 'cp-dotPast' : ''}`}
                  style={{ '--dot-accent': job.accent }}
                >
                  <span className="cp-dotCircle" />
                </div>
              ))}
            </div>
          </div>

          {/* Active job info */}
          <div className="cp-jobInfo" key={activeJob.id}>
            <p className="cp-date">{activeJob.date}</p>
            <h3 className="cp-role">{activeJob.role}</h3>
            <p className="cp-company">
              {activeJob.company} · {activeJob.location}
            </p>
            <p className="cp-desc">{activeJob.description}</p>

            {/* Project counter */}
            <div className="cp-projCounter">
              {activeJob.projects.map((_, i) => (
                <span
                  key={i}
                  className={`cp-projDot ${i === projectIndex ? 'cp-projDotActive' : ''}`}
                  style={{ background: i === projectIndex ? activeJob.accent : undefined }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Project content with parallax */}
        <div className="cp-right">
          <div
            className="cp-projectCard"
            style={{ '--accent': activeProject ? activeJob.accent : 'hsl(230,80%,65%)' }}
          >
            {/* Scroll-driven SVG visual */}
            <div className="cp-visual">
              {activeProject && (
                <ProjectVisual
                  type={activeProject.visual}
                  progress={projectProgress}
                  accent={activeJob.accent}
                />
              )}
            </div>

            {/* Project info */}
            {activeProject && (
              <div
                className="cp-projInfo"
                style={{
                  opacity: Math.max(0.15, Math.min(1, projectProgress * 2.5 + 0.15)),
                  transform: `translateY(${(1 - Math.min(1, projectProgress * 2 + 0.3)) * 16}px)`
                }}
              >
                <h4 className="cp-projTitle">{activeProject.title}</h4>
                <p className="cp-projDesc">{activeProject.desc}</p>

                {/* Stats */}
                <div className="cp-stats">
                  {activeProject.stats.map((s) => (
                    <div key={s.label} className="cp-stat">
                      <span className="cp-statVal">{s.value}</span>
                      <span className="cp-statLabel">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="cp-tags">
                  {activeProject.tags.map((t) => (
                    <span key={t} className="cp-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scroll hint */}
          <div className="cp-scrollHint" style={{ opacity: globalProgress < 0.05 ? 1 : 0 }}>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect
                x="1"
                y="1"
                width="14"
                height="22"
                rx="7"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
              <circle cx="8" cy="8" r="2" fill="rgba(255,255,255,0.4)">
                <animate attributeName="cy" values="7;14;7" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cp-container {
          position: relative;
        }

        .cp-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: center;
          padding: 2rem max(2rem, calc((100vw - 1200px) / 2));
          box-sizing: border-box;
          width: 100%;
        }

        /* Left column */
        .cp-left {
          position: relative;
          padding-left: 2.8rem;
        }

        .cp-timeline {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 140px;
          width: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cp-progressLine {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border);
          border-radius: 1px;
          overflow: hidden;
        }

        .cp-progressFill {
          width: 100%;
          border-radius: 1px;
          background: var(--text-tertiary);
          transition: height 150ms linear;
          will-change: height;
        }

        .cp-dots {
          position: relative;
          z-index: 1;
          width: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 0.5rem 0;
          box-sizing: border-box;
        }

        .cp-dot {
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cp-dotCircle {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: transparent;
          border: 1.5px solid var(--dot-accent);
          transition: all 500ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: width, height, background, box-shadow;
          box-sizing: border-box;
        }

        .cp-dotActive .cp-dotCircle {
          width: 10px;
          height: 10px;
          background: var(--dot-accent);
          border-color: var(--dot-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--dot-accent) 25%, transparent);
        }

        .cp-dotPast .cp-dotCircle {
          background: var(--dot-accent);
          border-color: var(--dot-accent);
          width: 6px;
          height: 6px;
        }

        .cp-jobInfo {
          animation: cpFadeIn 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: opacity, transform;
        }

        @keyframes cpFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cp-date {
          margin: 0 0 0.2rem;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--text-tertiary, #6b7280);
          letter-spacing: 0.02em;
        }

        .cp-role {
          margin: 0;
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary, #f0f2f8);
          letter-spacing: -0.02em;
        }

        .cp-company {
          margin: 0.15rem 0 0;
          font-size: 0.85rem;
          color: var(--text-secondary, #9ba3b8);
        }

        .cp-desc {
          margin: 0.6rem 0 0;
          font-size: 0.85rem;
          color: var(--text-secondary, #9ba3b8);
          line-height: 1.55;
          max-width: 36ch;
        }

        .cp-projCounter {
          display: flex;
          gap: 0.4rem;
          margin-top: 1rem;
        }

        .cp-projDot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border);
          transition: all 300ms ease;
        }

        .cp-projDotActive {
          width: 20px;
          border-radius: 3px;
        }

        /* Right column */
        .cp-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .cp-projectCard {
          width: 100%;
          border-radius: 16px;
          background: color-mix(in srgb, var(--surface) 60%, transparent);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--border);
          padding: 1.5rem;
          overflow: hidden;
          box-shadow:
            0 1px 2px hsl(var(--shadow-color, 230 40% 10%) / 0.08),
            0 4px 12px hsl(var(--shadow-color, 230 40% 10%) / 0.06);
          transition:
            border-color 500ms ease,
            box-shadow 500ms ease;
        }

        .cp-projectCard:hover {
          border-color: color-mix(in srgb, var(--accent) 25%, transparent);
          box-shadow:
            0 2px 4px hsl(var(--shadow-color, 230 40% 10%) / 0.1),
            0 8px 24px hsl(var(--shadow-color, 230 40% 10%) / 0.1);
        }

        .cp-visual {
          width: 100%;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          border-radius: 10px;
          background: color-mix(in srgb, var(--bg) 70%, transparent);
          border: 1px solid var(--border);
        }

        .cp-visual :global(.pv-svg) {
          width: 100%;
          height: 100%;
          padding: 8px;
        }

        .cp-projInfo {
          transition:
            opacity 400ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cp-projTitle {
          margin: 0;
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary, #f0f2f8);
          letter-spacing: -0.01em;
        }

        .cp-projDesc {
          margin: 0.35rem 0 0;
          font-size: 0.82rem;
          color: var(--text-secondary, #9ba3b8);
          line-height: 1.55;
        }

        .cp-stats {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.8rem;
        }

        .cp-stat {
          display: flex;
          flex-direction: column;
        }

        .cp-statVal {
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-size: 1rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -0.02em;
        }

        .cp-statLabel {
          font-size: 0.65rem;
          color: var(--text-tertiary, #6b7280);
          font-weight: 500;
        }

        .cp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
          margin-top: 0.6rem;
        }

        .cp-tag {
          font-size: 0.65rem;
          font-weight: 500;
          color: var(--text-tertiary, #6b7280);
          background: var(--card-glow, rgba(255, 255, 255, 0.04));
          border: 1px solid var(--border);
          border-radius: 5px;
          padding: 0.15rem 0.45rem;
        }

        .cp-scrollHint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          color: var(--text-tertiary, #6b7280);
          transition: opacity 600ms ease;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .cp-sticky {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.5rem 1.5rem;
          }

          .cp-left {
            padding-left: 2rem;
          }

          .cp-role {
            font-size: 1.1rem;
          }

          .cp-visual {
            height: 100px;
          }
        }
      `}</style>
    </div>
  )
}
