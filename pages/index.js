import { useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { FloatingParticles } from '@components/SvgAnimations'
import CareerParallax from '@components/CareerParallax'
import SEOHead from '@components/organisms/SEOHead'
import ScrollProgress from '@components/atoms/ScrollProgress'
import SectionHeader from '@components/atoms/SectionHeader'
import NavBar from '@components/molecules/NavBar'
import SkillsGrid from '@components/molecules/SkillsMarquee'
import GlobalPlayButton from '@components/molecules/GlobalPlayButton'
import HeroSection from '@components/organisms/HeroSection'
import ProjectsSection from '@components/organisms/ProjectsSection'
import MusicSection from '@components/organisms/MusicSection'
import ContactSection from '@components/organisms/ContactSection'
import SiteFooter from '@components/organisms/SiteFooter'
import useTheme from '@hooks/useTheme'
import useScrollProgress from '@hooks/useScrollProgress'
import useRoleRotation from '@hooks/useRoleRotation'
import useRevealOnScroll from '@hooks/useRevealOnScroll'
import useSpotlight from '@hooks/useSpotlight'
import useHeaderParallax from '@hooks/useHeaderParallax'
import useSoundCloud from '@hooks/useSoundCloud'
import { ROLES, SKILLS, AMBIENT_LIGHTS } from '@data/constants'

const ParticleNetwork = dynamic(() => import('@components/ParticleNetwork'), { ssr: false })

export default function Home() {
  const { theme, toggleTheme } = useTheme()
  const { progress, navSolid } = useScrollProgress()
  const { role, visible: roleVisible } = useRoleRotation(ROLES)
  const [launchState, setLaunchState] = useState(null)

  const heroRef = useRef(null)
  const devRef = useRef(null)
  const careerRef = useRef(null)
  const musicRef = useRef(null)
  const spotlightRef = useRef(null)
  const lightsRef = useRef(null)
  const scIframeRef = useRef(null)
  const launchTimerRef = useRef(null)

  const { trackTitle, playingRef, isPlaying, hasPlayed, prev, next, toggle } = useSoundCloud(scIframeRef)

  useRevealOnScroll()
  useSpotlight({ heroRef, devRef, careerRef, musicRef, spotlightRef, lightsRef })
  useHeaderParallax()

  const handleLaunch = useCallback(
    (e, id, url) => {
      e.preventDefault()
      if (launchState) return
      const r = e.currentTarget.getBoundingClientRect()
      const x = ((r.left + r.width / 2) / window.innerWidth) * 100
      const y = ((r.top + r.height / 2) / window.innerHeight) * 100
      setLaunchState({ id, url, x, y })
      launchTimerRef.current = setTimeout(() => {
        window.open(url, '_blank')
        setTimeout(() => setLaunchState(null), 300)
      }, 800)
    },
    [launchState]
  )

  return (
    <div
      className={`scene${launchState ? ` launch-${launchState.id} launching` : ''}`}
      style={launchState ? { '--lx': `${launchState.x}%`, '--ly': `${launchState.y}%` } : undefined}
    >
      <SEOHead />
      <ScrollProgress progress={progress} />
      <NavBar navSolid={navSolid} theme={theme} onToggleTheme={toggleTheme} />

      <ParticleNetwork />

      {/* Spotlight */}
      <div ref={spotlightRef} className="spotlight" aria-hidden="true" />

      {/* Ambient background */}
      <div className="bgLayer" aria-hidden="true">
        <FloatingParticles />
        <div ref={lightsRef} className="ambientLights">
          {AMBIENT_LIGHTS.map((light, i) => (
            <span
              key={i}
              className="aLight"
              data-speed={light.speed}
              style={{
                '--ax': light.ax,
                '--ay': light.ay,
                '--asize': light.asize,
                '--acolor': light.acolor,
                '--ablur': light.ablur,
                '--aopacity': light.aopacity
              }}
            />
          ))}
        </div>
      </div>

      {/* Launch tunnel overlay */}
      <div className="tunnel" aria-hidden="true" />

      <main className="wrapper">
        <HeroSection ref={heroRef} role={role} roleVisible={roleVisible} />
        <div className="sectionGap" />
      </main>

      {/* Career — full-width scroll-locked parallax */}
      <section ref={careerRef} className="careerRegion" id="career" aria-label="Career history">
        <div className="careerHeader">
          <SectionHeader
            number="02"
            title="Career"
            description="Scroll to explore my roles and the projects I shipped at each"
          />
        </div>
        <CareerParallax />
      </section>

      <main className="wrapper">
        <div className="sectionGap" />
        <ProjectsSection ref={devRef} onLaunch={handleLaunch} />
        <div className="sectionGap" />

        {/* Skills */}
        <section className="region skillsRegion" data-reveal id="skills" aria-label="Technical skills">
          <SectionHeader number="03" title="Tech Stack" description="Technologies I work with daily" />
          <SkillsGrid skills={SKILLS} />
        </section>

        <div className="sectionGap" />
        <MusicSection
          ref={musicRef}
          theme={theme}
          iframeRef={scIframeRef}
          trackTitle={trackTitle}
          playingRef={playingRef}
          prev={prev}
          next={next}
        />
        <div className="sectionGap" />
        <ContactSection />
        <div className="sectionGap" />
      </main>

      <GlobalPlayButton
        isPlaying={isPlaying}
        hasPlayed={hasPlayed}
        trackTitle={trackTitle}
        onToggle={toggle}
        onPrev={prev}
        onNext={next}
      />

      <SiteFooter />

      <style jsx global>{`
        /* ═══════════════════════════════════
           Scene
        ═══════════════════════════════════ */
        .scene {
          --font-display: 'Outfit', -apple-system, sans-serif;
          --font-body: 'Inter', -apple-system, sans-serif;

          /* ── Spacing scale (4px base) ── */
          --space-xs: 0.25rem; /* 4px  */
          --space-sm: 0.5rem; /* 8px  */
          --space-md: 0.75rem; /* 12px */
          --space-lg: 1rem; /* 16px */
          --space-xl: 1.5rem; /* 24px */
          --space-2xl: 2rem; /* 32px */
          --space-3xl: 3rem; /* 48px */
          --space-4xl: 4rem; /* 64px */
          --space-5xl: 6rem; /* 96px */

          /* ── Dynamic gutter: fluid side padding ── */
          --max-width: 1120px;
          --gutter: max(var(--space-xl), calc((100vw - var(--max-width)) / 2));

          min-height: 100vh;
          position: relative;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          font-family: var(--font-body);
          color: var(--text-primary);
          transition:
            background-color 0.4s ease,
            color 0.4s ease;
        }

        /* ═══════════════════════════════════
           Scroll-reveal
        ═══════════════════════════════════ */
        [data-reveal] {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ═══════════════════════════════════
           Scroll Progress
        ═══════════════════════════════════ */
        .scrollProgress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 200;
          background: linear-gradient(90deg, var(--accent), hsl(260, 70%, 65%), hsl(200, 70%, 60%));
          transform-origin: left;
          will-change: transform;
          pointer-events: none;
        }

        /* ═══════════════════════════════════
           Navigation
        ═══════════════════════════════════ */
        .siteNav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-md) var(--gutter);
          background: transparent;
          transition:
            background-color 0.4s ease,
            backdrop-filter 0.4s ease,
            box-shadow 0.4s ease;
        }

        .navSolid {
          background: color-mix(in srgb, var(--bg) 85%, transparent);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 var(--border);
        }

        .navLogo {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          user-select: none;
        }

        .navLinks {
          display: flex;
          gap: 0.2rem;
        }

        .navLink {
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-tertiary);
          text-decoration: none;
          padding: 0.4rem 0.7rem;
          border-radius: 8px;
          transition:
            color 0.2s ease,
            background-color 0.2s ease;
        }

        .navLink:hover {
          color: var(--text-primary);
          background: color-mix(in srgb, var(--accent) 8%, transparent);
        }

        /* ═══════════════════════════════════
           Theme toggle (inside nav)
        ═══════════════════════════════════ */
        .themeToggle {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          border-radius: 50%;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            transform 0.2s ease;
        }

        .themeToggle:hover {
          color: var(--text-primary);
          border-color: var(--card-hover-border);
          transform: scale(1.08);
        }

        .themeToggle:active {
          transform: scale(0.95);
        }

        .themeIcon {
          width: 16px;
          height: 16px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .themeToggle:hover .themeIcon {
          transform: rotate(15deg);
        }

        /* ═══════════════════════════════════
           Spotlight — follows focus section
        ═══════════════════════════════════ */
        .spotlight {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: var(--spot-opacity);
          transition: opacity 0.4s ease;
        }

        /* ═══════════════════════════════════
           Ambient background
        ═══════════════════════════════════ */
        .bgLayer {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: var(--bg-layer-opacity);
          transition: opacity 0.4s ease;
        }

        .ambientLights {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .aLight {
          position: absolute;
          left: var(--ax);
          top: var(--ay);
          width: var(--asize);
          height: var(--asize);
          border-radius: 50%;
          background: radial-gradient(circle, var(--acolor) 0%, transparent 65%);
          filter: blur(var(--ablur));
          opacity: var(--aopacity);
          transform: translate(-50%, -50%);
          will-change: transform;
          animation: aLightBreathe 8s ease-in-out infinite alternate;
        }

        .aLight:nth-child(2n) {
          animation-duration: 10s;
          animation-delay: 2s;
        }
        .aLight:nth-child(3n) {
          animation-duration: 12s;
          animation-delay: 4s;
        }

        @keyframes aLightBreathe {
          0% {
            opacity: var(--aopacity);
          }
          100% {
            opacity: calc(var(--aopacity) * 1.5);
          }
        }

        /* ═══════════════════════════════════
           Launch tunnel
        ═══════════════════════════════════ */
        .tunnel {
          position: fixed;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          opacity: 0;
          clip-path: circle(0% at var(--lx, 50%) var(--ly, 50%));
          background: radial-gradient(
            circle at var(--lx, 50%) var(--ly, 50%),
            hsl(230, 60%, 40%) 0%,
            var(--bg) 60%
          );
          transition:
            clip-path 1000ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 300ms ease;
        }

        .launch-evo .tunnel {
          background: radial-gradient(
            circle at var(--lx, 50%) var(--ly, 50%),
            hsl(210, 70%, 50%) 0%,
            hsl(210, 50%, 12%) 50%,
            var(--bg) 80%
          );
        }

        .launch-solar .tunnel {
          background: radial-gradient(
            circle at var(--lx, 50%) var(--ly, 50%),
            hsl(32, 90%, 58%) 0%,
            hsl(24, 50%, 14%) 50%,
            var(--bg) 80%
          );
        }

        .launch-minira .tunnel {
          background: radial-gradient(
            circle at var(--lx, 50%) var(--ly, 50%),
            hsl(140, 80%, 50%) 0%,
            hsl(140, 40%, 12%) 50%,
            var(--bg) 80%
          );
        }

        .launching .tunnel {
          opacity: 1;
          clip-path: circle(150vmax at var(--lx, 50%) var(--ly, 50%));
        }

        .launching .wrapper,
        .launching .careerRegion,
        .launching .siteFooter {
          opacity: 0;
          transform: scale(0.96);
          filter: blur(4px);
          pointer-events: none;
          transition:
            opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .launching .siteNav {
          opacity: 0;
          transform: translateY(-20px);
          transition:
            opacity 400ms ease,
            transform 400ms ease;
        }

        /* ═══════════════════════════════════
           Wrapper
        ═══════════════════════════════════ */
        .wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          padding: var(--space-5xl) var(--gutter) var(--space-3xl);
          flex: 1;
          box-sizing: border-box;
          transition:
            opacity 400ms ease,
            transform 500ms ease;
        }

        /* ═══════════════════════════════════
           Hero
        ═══════════════════════════════════ */
        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: visible;
          padding: var(--space-5xl) 0 var(--space-4xl);
        }

        .heroContent {
          position: relative;
          z-index: 1;
          max-width: 640px;
          animation: fadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .heroGreeting {
          margin: 0 0 var(--space-sm);
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 100ms;
        }

        .heroName {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.02;
          color: var(--text-primary);
          opacity: 0;
          animation: fadeUp 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 200ms;
        }

        .heroNameGradient {
          background: linear-gradient(135deg, var(--accent), hsl(260, 70%, 65%), hsl(200, 70%, 60%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .heroRole {
          margin: var(--space-lg) 0 0;
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--accent);
          letter-spacing: -0.01em;
          min-height: 1.6em;
          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
        }

        .roleVisible {
          opacity: 1;
          transform: translateY(0);
        }

        .roleHidden {
          opacity: 0;
          transform: translateY(8px);
        }

        .heroBio {
          margin: var(--space-lg) 0 0;
          font-family: var(--font-body);
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 48ch;
          opacity: 0;
          animation: fadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 480ms;
        }

        .heroCtas {
          display: flex;
          gap: var(--space-md);
          margin-top: var(--space-2xl);
          opacity: 0;
          animation: fadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 600ms;
        }

        .ctaPrimary {
          display: inline-flex;
          align-items: center;
          padding: var(--space-md) var(--space-xl);
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, var(--accent), hsl(260, 70%, 60%));
          border-radius: 10px;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            box-shadow 0.3s ease;
          box-shadow: 0 2px 12px hsla(230, 80%, 50%, 0.25);
        }

        .ctaPrimary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px hsla(230, 80%, 50%, 0.35);
        }

        .ctaSecondary {
          display: inline-flex;
          align-items: center;
          padding: var(--space-md) var(--space-xl);
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 10px;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            border-color 0.3s ease,
            color 0.3s ease;
        }

        .ctaSecondary:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
          color: var(--accent);
        }

        .heroScrollHint {
          position: absolute;
          bottom: var(--space-2xl);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-tertiary);
          opacity: 0;
          animation: fadeIn 1s ease both;
          animation-delay: 1.5s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: var(--max-opacity, 1);
          }
        }

        /* Living background — floating blobs, pulsing orbs, blinking lights */
        .fp-alive {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .fp-blob {
          position: absolute;
          left: var(--bx);
          top: var(--by);
          width: var(--bsize);
          height: var(--bsize);
          border-radius: 50%;
          background: radial-gradient(circle, var(--bcolor) 0%, transparent 70%);
          filter: blur(var(--bblur));
          opacity: var(--bopacity);
          transform: translate(-50%, -50%);
          animation: fpDrift var(--bdur) ease-in-out infinite alternate;
          animation-delay: var(--bdelay);
          will-change: transform;
        }

        @keyframes fpDrift {
          0% {
            transform: translate(-50%, -50%) translate(0, 0);
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--bdx), var(--bdy));
          }
        }

        .fp-pulse {
          position: absolute;
          left: var(--px);
          top: var(--py);
          width: var(--psize);
          height: var(--psize);
          border-radius: 50%;
          background: radial-gradient(circle, var(--pcolor) 0%, transparent 70%);
          filter: blur(30px);
          opacity: 0;
          transform: translate(-50%, -50%);
          animation: fpPulse var(--pdur) ease-in-out infinite;
          animation-delay: var(--pdelay);
        }

        @keyframes fpPulse {
          0%,
          100% {
            opacity: 0.02;
            transform: translate(-50%, -50%) scale(0.8);
          }
          50% {
            opacity: var(--pmaxop);
            transform: translate(-50%, -50%) scale(1.15);
          }
        }

        .fp-blink {
          position: absolute;
          left: var(--lx);
          top: var(--ly);
          width: var(--lsize);
          height: var(--lsize);
          border-radius: 50%;
          background: var(--lcolor);
          filter: blur(2px);
          opacity: 0;
          animation: fpBlink var(--ldur) ease-in-out infinite;
          animation-delay: var(--ldelay);
        }

        @keyframes fpBlink {
          0%,
          100% {
            opacity: 0;
          }
          15% {
            opacity: var(--lmaxop);
          }
          30% {
            opacity: 0.02;
          }
          45% {
            opacity: var(--lmaxop);
          }
          60% {
            opacity: 0;
          }
        }

        /* ═══════════════════════════════════
           Section gap (soft transition)
        ═══════════════════════════════════ */
        .sectionGap {
          height: 0;
          margin: var(--space-3xl) auto;
          width: 0;
          background: none;
        }

        /* ═══════════════════════════════════
           Regions
        ═══════════════════════════════════ */
        .region {
          animation: fadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 400ms;
        }

        .musicRegion {
          animation-delay: 500ms;
        }

        .sectionHeaderSticky {
          padding-bottom: var(--space-sm);
          margin-bottom: var(--space-sm);
          will-change: transform;
        }

        .sectionNumber {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent);
          opacity: 0.6;
          margin-bottom: var(--space-sm);
        }

        .sectionTitle {
          margin: 0 0 var(--space-sm);
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-primary);
        }

        .regionDesc {
          margin: 0 0 var(--space-2xl);
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 48ch;
        }

        .subsectionTitle {
          margin: 0 0 var(--space-xs);
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .subsectionDesc {
          margin: 0 0 var(--space-lg);
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.55;
          max-width: 48ch;
        }

        .cardGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-md);
        }

        /* ═══════════════════════════════════
           Skills Grid
        ═══════════════════════════════════ */
        .skillsRegion {
          overflow: visible;
        }

        .skillsGrid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-md);
        }

        .skillChip {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-lg);
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: color-mix(in srgb, var(--surface) 80%, transparent);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--border);
          border-radius: 12px;
          white-space: nowrap;
          opacity: 0;
          animation: chipReveal 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: var(--chip-delay, 0ms);
          transition:
            border-color 0.25s ease,
            color 0.25s ease,
            background-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .skillChip:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 6%, var(--surface));
          transform: translateY(-2px);
          box-shadow: 0 4px 12px hsl(var(--shadow-color) / 0.12);
        }

        .skillChip:hover .skillIcon {
          transform: scale(1.15) rotate(-5deg);
          opacity: 1;
        }

        @keyframes chipReveal {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.95);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .skillIcon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          opacity: 0.55;
          transition:
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.25s ease;
        }

        .skillLabel {
          line-height: 1;
        }

        /* ═══════════════════════════════════
           Career (handled by CareerParallax)
        ═══════════════════════════════════ */
        .careerRegion {
          position: relative;
          z-index: 1;
          width: 100%;
          transition:
            opacity 400ms ease,
            transform 500ms ease;
        }

        .careerHeader {
          padding: var(--space-2xl) var(--gutter) var(--space-lg);
        }

        /* ═══════════════════════════════════
           Music — audio-reactive breathing
           CSS custom props set by JS:
           --energy, --bass, --mid, --high (0–1)
        ═══════════════════════════════════ */
        .musicRegion {
          --energy: 0;
          --bass: 0;
          --mid: 0;
          --high: 0;
          position: relative;
          border-radius: 20px;
          padding: var(--space-2xl) var(--space-xl);
          background: var(--surface);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          box-shadow:
            0 0 0 1px rgba(var(--music-glow-rgb), calc(var(--energy) * 0.15)),
            0 0 calc(8px + var(--bass) * 40px) rgba(var(--music-glow-rgb), calc(var(--bass) * 0.2)),
            0 0 calc(4px + var(--mid) * 20px) rgba(var(--music-glow2-rgb), calc(var(--mid) * 0.12)),
            inset 0 0 calc(20px + var(--bass) * 60px) rgba(var(--music-glow-rgb), calc(var(--bass) * 0.06));
          transform: scale(calc(1 + var(--bass) * 0.008));
          transition: transform 60ms linear;
        }

        .musicRegion::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 21px;
          background: linear-gradient(
            135deg,
            rgba(var(--music-glow-rgb), calc(var(--energy) * 0.2)),
            rgba(var(--music-glow2-rgb), calc(var(--mid) * 0.15)),
            rgba(var(--music-glow-rgb), calc(var(--high) * 0.1))
          );
          z-index: -1;
          opacity: calc(var(--energy) * 0.6);
          filter: blur(calc(2px + var(--bass) * 12px));
          transition: opacity 100ms linear;
        }

        .scPlayer {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border);
          margin-bottom: var(--space-md);
          background: var(--bg);
          box-shadow: 0 0 calc(var(--bass) * 20px) rgba(var(--music-glow-rgb), calc(var(--bass) * 0.1));
        }

        .scPlayer iframe {
          display: block;
          opacity: 0.85;
          transition: opacity 300ms ease;
        }

        .scPlayer:hover iframe {
          opacity: 1;
        }

        .scControls {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-top: var(--space-sm);
        }

        .scBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          border-radius: 50%;
          background: color-mix(in srgb, var(--surface) 90%, transparent);
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0;
          transition: all 200ms ease;
          flex-shrink: 0;
        }

        .scBtn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 8%, var(--surface));
        }

        .scTrackTitle {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--text-tertiary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
          flex: 1;
        }

        .scLink {
          display: inline-block;
          margin-top: var(--space-sm);
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-tertiary);
          text-decoration: none;
          transition: color 300ms ease;
        }

        .scLink:hover {
          color: var(--accent);
        }

        .scIcon {
          width: 22px;
          height: 22px;
        }

        /* ═══════════════════════════════════
           Card
           - Layered shadows (Comeau)
           - Asymmetric transitions (fast in, slow out)
           - Subtle glow on hover
        ═══════════════════════════════════ */
        .cardGrid {
          perspective: 800px;
        }

        .card {
          position: relative;
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          padding: var(--space-lg) var(--space-xl);
          text-decoration: none;
          color: var(--text-primary);
          background: color-mix(in srgb, var(--surface) 92%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          isolation: isolate;
          will-change: transform;
          transform-style: preserve-3d;
          /* Layered color-matched shadows */
          box-shadow:
            0 1px 1px hsl(var(--shadow-color) / 0.15),
            0 2px 2px hsl(var(--shadow-color) / 0.12),
            0 4px 4px hsl(var(--shadow-color) / 0.1),
            0 8px 8px hsl(var(--shadow-color) / 0.08);
          /* Shadow transitions only — transform handled by lerp */
          transition: box-shadow 500ms ease;
        }

        .card:nth-child(1) {
          animation: cardSlide 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 480ms;
        }
        .card:nth-child(2) {
          animation: cardSlide 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 580ms;
        }
        .card:nth-child(3) {
          animation: cardSlide 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 680ms;
        }

        /* Glow layer behind card on hover */
        .cardGlow {
          position: absolute;
          inset: -1px;
          z-index: -1;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 500ms ease;
        }

        .evoCard .cardGlow {
          background: radial-gradient(ellipse at 30% 50%, var(--glow-evo) 0%, transparent 60%);
        }

        .solarCard .cardGlow {
          background: radial-gradient(ellipse at 30% 50%, var(--glow-solar) 0%, transparent 60%);
        }

        .musicCard .cardGlow {
          background: radial-gradient(ellipse at 30% 50%, var(--glow-music) 0%, transparent 60%);
        }

        .radarCard .cardGlow {
          background: radial-gradient(ellipse at 30% 50%, hsla(140, 70%, 45%, 0.15) 0%, transparent 60%);
        }

        /* Hover shadow only — transform handled by lerp */
        .card:hover {
          box-shadow:
            0 1px 1px hsl(var(--shadow-color) / 0.18),
            0 2px 2px hsl(var(--shadow-color) / 0.15),
            0 4px 4px hsl(var(--shadow-color) / 0.12),
            0 8px 8px hsl(var(--shadow-color) / 0.1),
            0 16px 16px hsl(var(--shadow-color) / 0.06),
            0 32px 32px hsl(var(--shadow-color) / 0.03);
          transition: box-shadow 150ms ease;
        }

        .card:hover .cardGlow {
          opacity: 1;
          transition: opacity 150ms ease;
        }

        .card:hover .cardArrow {
          transform: translateX(3px);
          color: var(--text-primary);
          transition:
            transform 150ms ease,
            color 150ms ease;
        }

        .card:hover .cardIcon {
          transform: scale(1.06) rotate(-2deg);
          transition: transform 180ms ease;
        }

        /* ═══════════════════════════════════
           Card internals
        ═══════════════════════════════════ */
        .cardIcon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: color-mix(in srgb, var(--surface-raised) 90%, transparent);
          border: 1px solid var(--border);
          transition: transform 500ms ease;
        }

        .icon {
          width: 26px;
          height: 26px;
          overflow: visible;
        }

        .cardBody {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .cardTitle {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .cardDesc {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .cardArrow {
          flex-shrink: 0;
          font-size: 1.1rem;
          color: var(--text-tertiary);
          transition:
            transform 500ms ease,
            color 500ms ease;
        }

        /* ═══════════════════════════════════
           SVG icon styles
        ═══════════════════════════════════ */
        .orbit,
        .planetOrbit {
          fill: none;
          stroke: hsl(220, 70%, 68%);
          stroke-width: 1.6;
          transform-origin: 50% 50%;
          transition: transform 500ms ease;
        }

        .glyph {
          fill: hsl(210, 70%, 72%);
          transform-origin: 50% 50%;
          transition: transform 500ms ease;
        }

        .glyphDot,
        .sun,
        .planet {
          fill: hsl(170, 70%, 72%);
          transform-origin: 50% 50%;
          transition: transform 500ms ease;
        }

        .tiltedOrbit {
          stroke: hsl(185, 60%, 62%);
          opacity: 0.8;
        }

        .card:hover .orbitOuter {
          transform: rotate(16deg) scale(1.04);
          transition: transform 200ms ease;
        }
        .card:hover .orbitInner {
          transform: rotate(-20deg) scale(1.06);
          transition: transform 220ms ease;
        }
        .card:hover .glyph {
          transform: translateY(-1px) scale(1.05);
          transition: transform 180ms ease;
        }
        .card:hover .glyphDot {
          transform: scale(1.12);
          transition: transform 160ms ease;
        }
        .card:hover .planetOrbit {
          transform: rotate(14deg) scale(1.04);
          transition: transform 200ms ease;
        }
        .card:hover .tiltedOrbit {
          transform: rotate(-16deg) scale(1.06);
          transition: transform 220ms ease;
        }
        .card:hover .planet {
          transform: translateX(2px) scale(1.1);
          transition: transform 180ms ease;
        }
        .card:hover .sun {
          transform: scale(1.14);
          transition: transform 160ms ease;
        }

        /* ═══════════════════════════════════
           Contact / Get in Touch
        ═══════════════════════════════════ */
        .contactGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }

        .contactCard {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-xl) var(--space-lg);
          text-decoration: none;
          color: var(--text-primary);
          background: color-mix(in srgb, var(--surface) 92%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 14px;
          text-align: center;
          transition:
            transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1),
            box-shadow 500ms ease,
            border-color 500ms ease;
          box-shadow:
            0 1px 1px hsl(var(--shadow-color) / 0.1),
            0 2px 4px hsl(var(--shadow-color) / 0.08);
        }

        .contactCard:hover {
          transform: translateY(-3px);
          border-color: var(--accent);
          box-shadow:
            0 2px 4px hsl(var(--shadow-color) / 0.12),
            0 8px 16px hsl(var(--shadow-color) / 0.08),
            0 16px 32px hsl(var(--shadow-color) / 0.04);
          transition:
            transform 150ms cubic-bezier(0.2, 0.7, 0.2, 1),
            box-shadow 150ms ease,
            border-color 150ms ease;
        }

        .contactIcon {
          width: 36px;
          height: 36px;
          color: var(--accent);
          transition: transform 300ms ease;
        }

        .contactCard:hover .contactIcon {
          transform: scale(1.1);
          transition: transform 150ms ease;
        }

        .contactLabel {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .contactValue {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* ═══════════════════════════════════
           Footer
        ═══════════════════════════════════ */
        .siteFooter {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
          padding: var(--space-3xl) var(--gutter);
          transition:
            opacity 400ms ease,
            transform 500ms ease;
        }

        .footerInner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
        }

        .footerLogo {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-primary);
        }

        .footerLinks {
          display: flex;
          gap: var(--space-xl);
        }

        .footerLinks a {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-tertiary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footerLinks a:hover {
          color: var(--accent);
        }

        .footerCopy {
          margin: 0;
          font-size: 0.72rem;
          color: var(--text-tertiary);
          opacity: 0.6;
        }

        /* ═══════════════════════════════════
           Global Play Button
        ═══════════════════════════════════ */
        .globalPlayer {
          position: fixed;
          bottom: var(--space-xl);
          right: var(--space-xl);
          z-index: 150;
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs);
          background: color-mix(in srgb, var(--surface) 88%, transparent);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 100px;
          box-shadow:
            0 4px 24px hsl(var(--shadow-color) / 0.18),
            0 1px 4px hsl(var(--shadow-color) / 0.12);
          animation: gpbSlideIn 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes gpbSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .globalPlayerBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0;
          border-radius: 50%;
          transition:
            color 0.2s ease,
            background-color 0.2s ease,
            transform 0.15s ease;
          flex-shrink: 0;
        }

        .globalPlayerBtn:hover {
          color: var(--text-primary);
          transform: scale(1.1);
        }

        .globalPlayerBtn:active {
          transform: scale(0.95);
        }

        .gpbMain {
          position: relative;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--accent), hsl(260, 70%, 60%));
          color: #fff;
          box-shadow: 0 2px 12px hsla(230, 80%, 50%, 0.3);
        }

        .gpbMain:hover {
          color: #fff;
          box-shadow: 0 4px 20px hsla(230, 80%, 50%, 0.4);
        }

        .gpbSmall {
          width: 28px;
          height: 28px;
        }

        .gpbRing {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          opacity: 0.5;
          animation: gpbPulse 2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes gpbPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.15);
            opacity: 0;
          }
        }

        .gpbTitle {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--text-tertiary);
          max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: var(--space-sm);
        }

        /* ═══════════════════════════════════
           Keyframes
        ═══════════════════════════════════ */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes cardSlide {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        /* ═══════════════════════════════════
           Responsive
        ═══════════════════════════════════ */
        @media (max-width: 768px) {
          .navLinks {
            display: none;
          }

          .siteNav {
            padding: var(--space-sm) var(--space-lg);
          }
        }

        @media (max-width: 640px) {
          /* Scroll-snap on mobile */
          .scene {
            scroll-snap-type: y proximity;
          }

          .wrapper {
            padding-top: var(--space-2xl);
          }

          .hero {
            min-height: 100svh;
            padding: var(--space-4xl) 0 var(--space-2xl);
            scroll-snap-align: start;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .heroScrollHint {
            bottom: var(--space-3xl);
          }

          .heroName {
            font-size: 2.4rem;
          }

          .heroBio {
            font-size: 0.93rem;
          }

          .heroCtas {
            flex-direction: column;
          }

          .ctaPrimary,
          .ctaSecondary {
            justify-content: center;
            width: 100%;
          }

          .careerRegion {
            scroll-snap-align: start;
          }

          .region {
            scroll-snap-align: start;
            min-height: 100svh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .skillsRegion {
            min-height: auto;
            justify-content: flex-start;
            padding-top: var(--space-4xl);
          }

          .cardGrid {
            grid-template-columns: 1fr;
          }

          .card {
            padding: var(--space-lg);
          }

          .sectionGap {
            margin: var(--space-lg) auto;
            height: 0;
          }

          .contactGrid {
            grid-template-columns: 1fr;
          }

          .musicRegion {
            padding: var(--space-lg);
            border-radius: 14px;
          }

          .scPlayer {
            border-radius: 10px;
          }

          .siteFooter {
            scroll-snap-align: end;
          }

          .footerLinks {
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--space-lg);
          }

          .globalPlayer {
            bottom: var(--space-lg);
            right: var(--space-lg);
          }

          .gpbTitle {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
