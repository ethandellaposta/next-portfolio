import { forwardRef, memo } from 'react'

function HeroSection({ role, roleVisible }, ref) {
  return (
    <section ref={ref} className="hero" id="hero">
      <div className="heroContent">
        <p className="heroGreeting">Hey, I'm</p>
        <h1 className="heroName">
          Ethan<br />
          <span className="heroNameGradient">Della Posta</span>
        </h1>
        <p className={`heroRole ${roleVisible ? 'roleVisible' : 'roleHidden'}`}>
          {role}
        </p>
        <p className="heroBio">
          Full stack web &amp; radar engineer building mission-critical software
          by day, simulations &amp; music by night. Available for freelance.
        </p>
        <div className="heroCtas">
          <a href="#contact" className="ctaPrimary">Get in Touch</a>
          <a href="#career" className="ctaSecondary">View My Work</a>
        </div>
      </div>
      <div className="heroScrollHint" aria-hidden="true">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
          <circle cx="10" cy="10" r="2.5" fill="currentColor" opacity="0.5">
            <animate attributeName="cy" values="10;20;10" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  )
}

export default memo(forwardRef(HeroSection))
