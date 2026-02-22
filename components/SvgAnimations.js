import { useRef, useEffect, useState } from 'react';

/**
 * Rich SVG animations using browser-native SVG features:
 * - SMIL <animate>, <animateTransform>, <animateMotion>
 * - Stroke dasharray draw-on effects
 * - Path morphing via <animate values="...">
 * - <clipPath>, <mask>, <filter> for advanced effects
 * - CSS keyframes on SVG elements
 */

// Animated hero illustration — full-width constellation network
export function HeroSvg() {
  // Generate a grid of nodes spread across the full viewBox
  const nodes = [
    // Top row
    { x: 60, y: 30, r: 2.5, hue: 230, dur: 3, delay: 0 },
    { x: 220, y: 20, r: 1.8, hue: 260, dur: 4, delay: 0.5 },
    { x: 400, y: 35, r: 2, hue: 200, dur: 3.5, delay: 1 },
    { x: 580, y: 25, r: 1.5, hue: 230, dur: 4.5, delay: 0.3 },
    { x: 740, y: 40, r: 2.2, hue: 280, dur: 3, delay: 1.2 },
    { x: 900, y: 22, r: 1.8, hue: 200, dur: 5, delay: 0.8 },
    // Mid-upper row
    { x: 120, y: 80, r: 3, hue: 230, dur: 3, delay: 0 },
    { x: 310, y: 70, r: 2, hue: 260, dur: 4, delay: 0.7 },
    { x: 500, y: 85, r: 2.5, hue: 200, dur: 3.5, delay: 0.4 },
    { x: 660, y: 75, r: 1.8, hue: 280, dur: 4, delay: 1.1 },
    { x: 830, y: 90, r: 2, hue: 230, dur: 3, delay: 0.6 },
    // Center row
    { x: 40, y: 140, r: 2, hue: 260, dur: 4.5, delay: 1.5 },
    { x: 180, y: 130, r: 2.8, hue: 230, dur: 3, delay: 0.2 },
    { x: 350, y: 150, r: 2, hue: 200, dur: 4, delay: 0.9 },
    { x: 540, y: 135, r: 3.2, hue: 260, dur: 3.5, delay: 0 },
    { x: 720, y: 145, r: 2, hue: 230, dur: 4, delay: 1.3 },
    { x: 880, y: 130, r: 2.5, hue: 280, dur: 3, delay: 0.5 },
    // Mid-lower row
    { x: 100, y: 200, r: 1.8, hue: 200, dur: 5, delay: 0.8 },
    { x: 270, y: 190, r: 2.2, hue: 230, dur: 3.5, delay: 0.3 },
    { x: 450, y: 210, r: 2, hue: 260, dur: 4, delay: 1 },
    { x: 620, y: 195, r: 2.5, hue: 200, dur: 3, delay: 0.6 },
    { x: 800, y: 205, r: 1.8, hue: 280, dur: 4.5, delay: 1.4 },
    { x: 950, y: 190, r: 2, hue: 230, dur: 3.5, delay: 0.2 },
    // Bottom row
    { x: 50, y: 260, r: 1.5, hue: 260, dur: 4, delay: 1.2 },
    { x: 200, y: 270, r: 2, hue: 200, dur: 3, delay: 0.7 },
    { x: 380, y: 255, r: 1.8, hue: 230, dur: 4.5, delay: 0 },
    { x: 560, y: 265, r: 2.2, hue: 280, dur: 3.5, delay: 0.9 },
    { x: 760, y: 250, r: 2, hue: 200, dur: 4, delay: 0.4 },
    { x: 920, y: 270, r: 1.5, hue: 230, dur: 3, delay: 1.1 },
  ];

  // Generate connections between nearby nodes
  const connections = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (dist < 200 && dist > 60) {
        connections.push({ a: nodes[i], b: nodes[j], dist, i, j });
      }
    }
  }
  // Keep only the best connections (not too many)
  const kept = connections.sort((a, b) => a.dist - b.dist).slice(0, 30);

  // Curved paths through clusters
  const paths = [
    'M 40,140 C 120,80 220,20 400,35 S 580,90 740,40 S 900,22 960,50',
    'M 0,200 C 100,200 180,130 350,150 S 540,135 720,145 S 880,130 1000,160',
    'M 60,30 C 120,80 310,70 500,85 S 660,75 830,90 S 950,60 1000,80',
    'M 50,260 C 200,270 380,255 560,265 S 760,250 920,270',
  ];

  return (
    <svg
      viewBox="0 0 1000 300"
      className="heroSvg"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(230, 80%, 68%)" stopOpacity="0" />
          <stop offset="30%" stopColor="hsl(230, 80%, 68%)" stopOpacity="0.4" />
          <stop offset="70%" stopColor="hsl(260, 70%, 65%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(200, 70%, 60%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(200, 70%, 60%)" stopOpacity="0.3" />
          <stop
            offset="100%"
            stopColor="hsl(260, 60%, 55%)"
            stopOpacity="0.1"
          />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(230, 80%, 68%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(230, 80%, 68%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connection lines between nodes */}
      {kept.map(({ a, b, i, j }) => (
        <line
          key={`c-${i}-${j}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke={`hsl(${a.hue}, 50%, 55%)`}
          strokeWidth="0.4"
          strokeOpacity="0.06"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.04;0.12;0.04"
            dur={`${6 + (i % 4)}s`}
            repeatCount="indefinite"
            begin={`${(i * 0.3) % 3}s`}
          />
        </line>
      ))}

      {/* Flowing curved paths */}
      {paths.map((d, i) => (
        <g key={`p-${i}`}>
          <path
            d={d}
            fill="none"
            stroke={i % 2 === 0 ? 'url(#lineGrad)' : 'url(#lineGrad2)'}
            strokeWidth={0.6 + (i % 2) * 0.3}
            className={`drawPath drawPath${i + 1}`}
          />
          <circle
            r={1.2 + (i % 2) * 0.3}
            fill={`hsl(${220 + i * 20}, 85%, 72%)`}
            opacity="0"
            filter="url(#glow)"
          >
            <animateMotion
              path={d}
              dur={`${5 + i * 1.5}s`}
              repeatCount="indefinite"
              begin={`${i * 0.8}s`}
            />
            <animate
              attributeName="opacity"
              values="0;0.8;0.8;0"
              dur={`${5 + i * 1.5}s`}
              repeatCount="indefinite"
              begin={`${i * 0.8}s`}
            />
          </circle>
        </g>
      ))}

      {/* Rotating dashed rings at key nodes */}
      {[nodes[6], nodes[14], nodes[9], nodes[20]].map((n, i) => (
        <circle
          key={`ring-${i}`}
          cx={n.x}
          cy={n.y}
          r={16 + i * 4}
          fill="none"
          stroke={`hsl(${n.hue}, 50%, 50%)`}
          strokeWidth="0.3"
          strokeOpacity="0.1"
          strokeDasharray={`${3 + i} ${6 + i * 2}`}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${i % 2 === 0 ? 0 : 360} ${n.x} ${n.y}`}
            to={`${i % 2 === 0 ? 360 : 0} ${n.x} ${n.y}`}
            dur={`${18 + i * 4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Soft glow spots */}
      {[nodes[6], nodes[14], nodes[8]].map((n, i) => (
        <circle
          key={`glow-${i}`}
          cx={n.x}
          cy={n.y}
          r="30"
          fill="url(#nodeGlow)"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur={`${4 + i}s`}
            repeatCount="indefinite"
            begin={`${i * 0.5}s`}
          />
        </circle>
      ))}

      {/* Nodes */}
      <g filter="url(#glow)">
        {nodes.map((n, i) => (
          <circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={`hsl(${n.hue}, 75%, 65%)`}
            opacity="0.6"
          >
            <animate
              attributeName="r"
              values={`${n.r};${n.r * 1.6};${n.r}`}
              dur={`${n.dur}s`}
              repeatCount="indefinite"
              begin={`${n.delay}s`}
            />
            <animate
              attributeName="opacity"
              values="0.6;0.3;0.6"
              dur={`${n.dur}s`}
              repeatCount="indefinite"
              begin={`${n.delay}s`}
            />
          </circle>
        ))}
      </g>

      {/* Shooting stars — bright streaks across the sky */}
      {[
        { x1: 150, y1: 10, x2: 280, y2: 60, dur: 1.2, delay: 3, hue: 220 },
        { x1: 600, y1: 5, x2: 720, y2: 50, dur: 0.9, delay: 8, hue: 260 },
        { x1: 800, y1: 20, x2: 900, y2: 80, dur: 1, delay: 14, hue: 200 },
        { x1: 350, y1: 15, x2: 500, y2: 70, dur: 1.1, delay: 20, hue: 240 },
        { x1: 50, y1: 40, x2: 180, y2: 90, dur: 0.8, delay: 26, hue: 210 },
      ].map((s, i) => (
        <line
          key={`shoot-${i}`}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke={`hsl(${s.hue}, 80%, 75%)`}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0"
          filter="url(#glow)"
        >
          <animate
            attributeName="opacity"
            values="0;0;0.9;0.9;0"
            dur={`${s.dur}s`}
            begin={`${s.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            values="0 300;120 300;0 300"
            dur={`${s.dur}s`}
            begin={`${s.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            values="300;0;-300"
            dur={`${s.dur}s`}
            begin={`${s.delay}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* Extra traveling pulses along connections */}
      {kept.slice(0, 8).map(({ a, b, i, j }) => (
        <circle
          key={`tp-${i}-${j}`}
          r="1"
          fill={`hsl(${a.hue}, 80%, 75%)`}
          opacity="0"
          filter="url(#glow)"
        >
          <animateMotion
            path={`M ${a.x},${a.y} L ${b.x},${b.y}`}
            dur={`${2 + (i % 3)}s`}
            begin={`${(i * 1.7) % 8}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.7;0.7;0"
            dur={`${2 + (i % 3)}s`}
            begin={`${(i * 1.7) % 8}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Morphing ambient shapes */}
      <path
        fill="none"
        stroke="hsl(230, 60%, 55%)"
        strokeWidth="0.4"
        strokeOpacity="0.1"
      >
        <animate
          attributeName="d"
          values="
          M 100,80 Q 250,40 400,80 T 700,80 T 950,60;
          M 100,100 Q 250,60 400,90 T 700,70 T 950,80;
          M 100,80 Q 250,40 400,80 T 700,80 T 950,60
        "
          dur="12s"
          repeatCount="indefinite"
        />
      </path>
      <path
        fill="none"
        stroke="hsl(260, 50%, 50%)"
        strokeWidth="0.3"
        strokeOpacity="0.08"
      >
        <animate
          attributeName="d"
          values="
          M 50,200 Q 200,170 400,200 T 750,190 T 1000,210;
          M 50,210 Q 200,190 400,180 T 750,210 T 1000,195;
          M 50,200 Q 200,170 400,200 T 750,190 T 1000,210
        "
          dur="15s"
          repeatCount="indefinite"
          begin="2s"
        />
      </path>

      <style>{`
        .drawPath { stroke-dasharray: 1500; stroke-dashoffset: 1500; animation: drawOn 3s ease forwards; }
        .drawPath2 { animation-delay: 0.5s; }
        .drawPath3 { animation-delay: 1s; }
        .drawPath4 { animation-delay: 1.5s; }
        @keyframes drawOn { to { stroke-dashoffset: 0; } }
      `}</style>
    </svg>
  );
}

// Animated Evolution icon — DNA helix with rotating strands
export function EvoIcon({ playing = false }) {
  const svgRef = useRef(null);
  useEffect(() => {
    if (!svgRef.current) return;
    if (playing) svgRef.current.unpauseAnimations();
    else svgRef.current.pauseAnimations();
  }, [playing]);
  useEffect(() => {
    if (svgRef.current) svgRef.current.pauseAnimations();
  }, []);
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 72 72"
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="evoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(210, 80%, 70%)" />
          <stop offset="100%" stopColor="hsl(170, 70%, 65%)" />
        </linearGradient>
        <filter id="evoGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* DNA helix strand 1 */}
      <path
        d="M 24,16 C 36,24 36,32 24,40 C 12,48 12,56 24,64"
        fill="none"
        stroke="hsl(210, 70%, 68%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="evoStrand"
      >
        <animate
          attributeName="d"
          values="
            M 24,16 C 36,24 36,32 24,40 C 12,48 12,56 24,64;
            M 24,16 C 12,24 12,32 24,40 C 36,48 36,56 24,64;
            M 24,16 C 36,24 36,32 24,40 C 12,48 12,56 24,64
          "
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* DNA helix strand 2 */}
      <path
        d="M 48,16 C 36,24 36,32 48,40 C 60,48 60,56 48,64"
        fill="none"
        stroke="hsl(170, 60%, 62%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="evoStrand"
      >
        <animate
          attributeName="d"
          values="
            M 48,16 C 36,24 36,32 48,40 C 60,48 60,56 48,64;
            M 48,16 C 60,24 60,32 48,40 C 36,48 36,56 48,64;
            M 48,16 C 36,24 36,32 48,40 C 60,48 60,56 48,64
          "
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Cross rungs */}
      {[24, 32, 40, 48, 56].map((y, i) => (
        <line
          key={y}
          x1="28"
          y1={y}
          x2="44"
          y2={y}
          stroke="hsl(220, 60%, 60%)"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.3;0.6;0.3"
            dur="2s"
            repeatCount="indefinite"
            begin={`${i * 0.3}s`}
          />
        </line>
      ))}

      {/* Center node */}
      <circle
        cx="36"
        cy="40"
        r="4"
        fill="url(#evoGrad)"
        opacity="0.8"
        filter="url(#evoGlow)"
      >
        <animate
          attributeName="r"
          values="4;5.5;4"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Orbiting particle */}
      <circle
        r="1.5"
        fill="hsl(170, 80%, 70%)"
        opacity="0.7"
        filter="url(#evoGlow)"
      >
        <animateMotion
          path="M 36,28 A 12,12 0 1 1 35.99,28"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

// Animated Solar System icon — orbiting planets with SMIL
export function SolarIcon({ playing = false }) {
  const svgRef = useRef(null);
  useEffect(() => {
    if (!svgRef.current) return;
    if (playing) svgRef.current.unpauseAnimations();
    else svgRef.current.pauseAnimations();
  }, [playing]);
  useEffect(() => {
    if (svgRef.current) svgRef.current.pauseAnimations();
  }, []);
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 72 72"
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(40, 95%, 65%)" />
          <stop offset="100%" stopColor="hsl(25, 90%, 55%)" />
        </radialGradient>
        <filter id="sunGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Orbit rings — dashed, slowly rotating */}
      <ellipse
        cx="36"
        cy="36"
        rx="22"
        ry="10"
        fill="none"
        stroke="hsl(220, 50%, 55%)"
        strokeWidth="0.6"
        strokeOpacity="0.25"
        strokeDasharray="3 5"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 36 36"
          to="360 36 36"
          dur="30s"
          repeatCount="indefinite"
        />
      </ellipse>

      <ellipse
        cx="36"
        cy="36"
        rx="14"
        ry="24"
        fill="none"
        stroke="hsl(200, 50%, 50%)"
        strokeWidth="0.6"
        strokeOpacity="0.2"
        strokeDasharray="2 4"
        transform="rotate(-20 36 36)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="-20 36 36"
          to="340 36 36"
          dur="24s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Sun with pulsing glow */}
      <circle cx="36" cy="36" r="8" fill="url(#sunGrad)" filter="url(#sunGlow)">
        <animate
          attributeName="r"
          values="8;9;8"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Corona rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 36 + Math.cos(rad) * 10;
        const y1 = 36 + Math.sin(rad) * 10;
        const x2 = 36 + Math.cos(rad) * 14;
        const y2 = 36 + Math.sin(rad) * 14;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="hsl(40, 90%, 65%)"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.25}s`}
            />
            <animate
              attributeName="x2"
              values={`${x2};${36 + Math.cos(rad) * 16};${x2}`}
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.25}s`}
            />
            <animate
              attributeName="y2"
              values={`${y2};${36 + Math.sin(rad) * 16};${y2}`}
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.25}s`}
            />
          </line>
        );
      })}

      {/* Planet 1 — orbiting on ellipse */}
      <circle r="3.5" fill="hsl(210, 70%, 60%)">
        <animateMotion
          path="M 58,36 A 22,10 0 1 1 57.99,36"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Planet 2 — smaller, faster, tilted orbit */}
      <circle r="2" fill="hsl(170, 65%, 55%)">
        <animateMotion
          path="M 36,12 A 14,24 0 1 1 35.99,12"
          dur="5s"
          repeatCount="indefinite"
          begin="1s"
        />
      </circle>

      {/* Moon orbiting planet 1 */}
      <circle r="1" fill="hsl(220, 60%, 70%)" opacity="0.7">
        <animateMotion
          path="M 58,36 A 22,10 0 1 1 57.99,36"
          dur="8s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          values="-5;5;-5"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="3;-3;3"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

// Animated Radar icon — sweeping beam with range rings and blips
export function RadarIcon({ playing = false }) {
  const svgRef = useRef(null);
  useEffect(() => {
    if (!svgRef.current) return;
    if (playing) svgRef.current.unpauseAnimations();
    else svgRef.current.pauseAnimations();
  }, [playing]);
  useEffect(() => {
    if (svgRef.current) svgRef.current.pauseAnimations();
  }, []);
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 72 72"
      className="icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(140, 80%, 55%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(140, 80%, 55%)" stopOpacity="0" />
        </linearGradient>
        <filter id="radarGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="radarClip">
          <circle cx="36" cy="36" r="28" />
        </clipPath>
      </defs>

      {/* Range rings */}
      {[10, 18, 26].map(r => (
        <circle
          key={r}
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="hsl(140, 50%, 50%)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
        />
      ))}

      {/* Outer ring */}
      <circle
        cx="36"
        cy="36"
        r="28"
        fill="none"
        stroke="hsl(140, 60%, 50%)"
        strokeWidth="1"
        strokeOpacity="0.3"
      />

      {/* Crosshairs */}
      <line
        x1="36"
        y1="8"
        x2="36"
        y2="64"
        stroke="hsl(140, 50%, 50%)"
        strokeWidth="0.4"
        strokeOpacity="0.12"
      />
      <line
        x1="8"
        y1="36"
        x2="64"
        y2="36"
        stroke="hsl(140, 50%, 50%)"
        strokeWidth="0.4"
        strokeOpacity="0.12"
      />

      {/* Sweep beam */}
      <g clipPath="url(#radarClip)">
        <path
          d="M 36,36 L 36,8 A 28,28 0 0,1 60,22 Z"
          fill="url(#radarSweepGrad)"
          opacity="0.6"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 36 36"
            to="360 36 36"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Sweep line */}
      <line
        x1="36"
        y1="36"
        x2="36"
        y2="8"
        stroke="hsl(140, 80%, 55%)"
        strokeWidth="1"
        strokeLinecap="round"
        filter="url(#radarGlow)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 36 36"
          to="360 36 36"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>

      {/* Center dot */}
      <circle
        cx="36"
        cy="36"
        r="2"
        fill="hsl(140, 80%, 55%)"
        filter="url(#radarGlow)"
      >
        <animate
          attributeName="r"
          values="2;2.5;2"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Blips that pulse */}
      {[
        { cx: 28, cy: 24, delay: '0s' },
        { cx: 48, cy: 30, delay: '0.8s' },
        { cx: 42, cy: 48, delay: '1.6s' },
        { cx: 22, cy: 42, delay: '2.2s' },
      ].map((blip, i) => (
        <circle
          key={i}
          cx={blip.cx}
          cy={blip.cy}
          r="1.5"
          fill="hsl(140, 80%, 60%)"
          filter="url(#radarGlow)"
        >
          <animate
            attributeName="opacity"
            values="0;1;0.8;0"
            dur="3s"
            repeatCount="indefinite"
            begin={blip.delay}
          />
          <animate
            attributeName="r"
            values="0;1.5;1.2;0"
            dur="3s"
            repeatCount="indefinite"
            begin={blip.delay}
          />
        </circle>
      ))}
    </svg>
  );
}

// Animated section divider — a flowing wave with draw-on
export function WaveDivider() {
  return (
    <svg
      viewBox="0 0 600 24"
      className="waveDivider"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(230, 80%, 68%)" stopOpacity="0" />
          <stop offset="30%" stopColor="hsl(230, 80%, 68%)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="hsl(260, 70%, 65%)" stopOpacity="0.4" />
          <stop offset="70%" stopColor="hsl(200, 70%, 60%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(200, 70%, 60%)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M 0,12 C 100,4 150,20 300,12 S 500,4 600,12"
        fill="none"
        stroke="url(#waveGrad)"
        strokeWidth="1"
        className="wavePath"
      />

      {/* Traveling spark */}
      <circle r="2" fill="hsl(230, 90%, 75%)" opacity="0">
        <animateMotion
          path="M 0,12 C 100,4 150,20 300,12 S 500,4 600,12"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;0.8;0.8;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>

      <style>{`
        .wavePath {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: waveDrawOn 2s ease forwards;
        }
        @keyframes waveDrawOn {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}

// Living background — floating blobs, pulsing orbs, blinking lights, all blurred
export function FloatingParticles() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // Floating blurred blobs that drift slowly
  const blobs = [
    {
      x: 15,
      y: 20,
      size: 180,
      hue: 230,
      sat: 50,
      light: 30,
      blur: 60,
      dur: 25,
      dx: 40,
      dy: 30,
      opacity: 0.12,
      delay: 0,
    },
    {
      x: 70,
      y: 10,
      size: 140,
      hue: 260,
      sat: 40,
      light: 25,
      blur: 50,
      dur: 30,
      dx: -30,
      dy: 45,
      opacity: 0.1,
      delay: 2,
    },
    {
      x: 85,
      y: 45,
      size: 200,
      hue: 210,
      sat: 55,
      light: 28,
      blur: 70,
      dur: 22,
      dx: -50,
      dy: -25,
      opacity: 0.1,
      delay: 5,
    },
    {
      x: 30,
      y: 65,
      size: 160,
      hue: 280,
      sat: 35,
      light: 22,
      blur: 55,
      dur: 28,
      dx: 35,
      dy: -40,
      opacity: 0.08,
      delay: 3,
    },
    {
      x: 55,
      y: 80,
      size: 190,
      hue: 300,
      sat: 30,
      light: 20,
      blur: 65,
      dur: 35,
      dx: -25,
      dy: 35,
      opacity: 0.09,
      delay: 7,
    },
    {
      x: 5,
      y: 50,
      size: 120,
      hue: 200,
      sat: 50,
      light: 30,
      blur: 45,
      dur: 20,
      dx: 30,
      dy: 20,
      opacity: 0.1,
      delay: 1,
    },
    {
      x: 45,
      y: 35,
      size: 150,
      hue: 240,
      sat: 45,
      light: 26,
      blur: 55,
      dur: 32,
      dx: -20,
      dy: -30,
      opacity: 0.07,
      delay: 4,
    },
    {
      x: 90,
      y: 75,
      size: 130,
      hue: 270,
      sat: 40,
      light: 24,
      blur: 50,
      dur: 26,
      dx: -35,
      dy: 20,
      opacity: 0.08,
      delay: 6,
    },
  ];

  // Pulsing orbs that breathe in and out
  const pulses = [
    { x: 20, y: 30, size: 80, hue: 230, dur: 4, delay: 0, maxOp: 0.15 },
    { x: 65, y: 15, size: 60, hue: 260, dur: 5, delay: 1.5, maxOp: 0.12 },
    { x: 80, y: 55, size: 70, hue: 200, dur: 3.5, delay: 0.8, maxOp: 0.13 },
    { x: 35, y: 70, size: 90, hue: 280, dur: 6, delay: 2.5, maxOp: 0.1 },
    { x: 50, y: 45, size: 50, hue: 215, dur: 4.5, delay: 3, maxOp: 0.14 },
    { x: 10, y: 85, size: 65, hue: 300, dur: 5.5, delay: 1, maxOp: 0.11 },
    { x: 90, y: 25, size: 55, hue: 240, dur: 3.8, delay: 4, maxOp: 0.12 },
    { x: 75, y: 90, size: 75, hue: 270, dur: 7, delay: 2, maxOp: 0.09 },
    { x: 40, y: 10, size: 45, hue: 220, dur: 4.2, delay: 0.5, maxOp: 0.13 },
    { x: 55, y: 60, size: 85, hue: 250, dur: 5.8, delay: 3.5, maxOp: 0.1 },
  ];

  // Blinking dim lights — tiny points that flicker
  const blinks = Array.from({ length: 30 }, (_, i) => {
    const phi = 1.618033988749;
    const angle = i * phi * Math.PI * 2;
    const radius = Math.sqrt(i / 30);
    return {
      x: 50 + Math.cos(angle) * radius * 48,
      y: 50 + Math.sin(angle) * radius * 48,
      size: 2 + (i % 4) * 1.5,
      hue: 200 + (i % 6) * 20,
      dur: 2 + (i % 5) * 1.5,
      delay: (i * 0.43) % 6,
      maxOp: 0.08 + (i % 3) * 0.06,
    };
  });

  const visibleBlobs = isMobile ? blobs.slice(0, 3) : blobs;
  const visiblePulses = isMobile ? pulses.slice(0, 4) : pulses;
  const visibleBlinks = isMobile ? blinks.slice(0, 10) : blinks;

  return (
    <div className="fp-alive" aria-hidden="true">
      {/* Floating blurred blobs */}
      {visibleBlobs.map((b, i) => (
        <span
          key={`blob-${i}`}
          className="fp-blob"
          style={{
            '--bx': `${b.x}%`,
            '--by': `${b.y}%`,
            '--bsize': `${b.size}px`,
            '--bcolor': `hsl(${b.hue}, ${b.sat}%, ${b.light}%)`,
            '--bblur': `${b.blur}px`,
            '--bopacity': b.opacity,
            '--bdur': `${b.dur}s`,
            '--bdx': `${b.dx}px`,
            '--bdy': `${b.dy}px`,
            '--bdelay': `${b.delay}s`,
          }}
        />
      ))}

      {/* Pulsing orbs */}
      {visiblePulses.map((p, i) => (
        <span
          key={`pulse-${i}`}
          className="fp-pulse"
          style={{
            '--px': `${p.x}%`,
            '--py': `${p.y}%`,
            '--psize': `${p.size}px`,
            '--pcolor': `hsl(${p.hue}, 50%, 40%)`,
            '--pdur': `${p.dur}s`,
            '--pdelay': `${p.delay}s`,
            '--pmaxop': p.maxOp,
          }}
        />
      ))}

      {/* Blinking dim lights */}
      {visibleBlinks.map((b, i) => (
        <span
          key={`blink-${i}`}
          className="fp-blink"
          style={{
            '--lx': `${b.x}%`,
            '--ly': `${b.y}%`,
            '--lsize': `${b.size}px`,
            '--lcolor': `hsl(${b.hue}, 40%, 55%)`,
            '--ldur': `${b.dur}s`,
            '--ldelay': `${b.delay}s`,
            '--lmaxop': b.maxOp,
          }}
        />
      ))}
    </div>
  );
}
