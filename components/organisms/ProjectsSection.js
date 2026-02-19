import { forwardRef, memo, useState, useCallback, useRef, useEffect } from 'react'
import { EvoIcon, SolarIcon, RadarIcon } from '@components/SvgAnimations'
import SectionHeader from '@components/atoms/SectionHeader'
import { PROJECTS } from '@data/constants'

const ICON_MAP = {
  evo: EvoIcon,
  solar: SolarIcon,
  radar: RadarIcon
}

const LERP = 0.08

function ProjectsSection({ onLaunch }, ref) {
  const [hoveredCard, setHoveredCard] = useState(null)
  const cardTargets = useRef({})
  const cardCurrents = useRef({})
  const rafRef = useRef(null)

  // Lerp loop for smooth card tilt
  useEffect(() => {
    function tick() {
      const targets = cardTargets.current
      const currents = cardCurrents.current
      Object.keys(targets).forEach((id) => {
        const t = targets[id]
        const c = currents[id] || (currents[id] = { x: 0, y: 0, lift: 0 })
        c.x += (t.x - c.x) * LERP
        c.y += (t.y - c.y) * LERP
        c.lift += (t.lift - c.lift) * LERP
        if (t.el) {
          t.el.style.transform = `translateY(${-c.lift}px) rotateY(${c.x * 8}deg) rotateX(${-c.y * 6}deg)`
        }
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleCardMove = useCallback((e, id) => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    cardTargets.current[id] = { x, y, lift: 4, el: card }
  }, [])

  const handleCardLeave = useCallback((id) => {
    if (cardTargets.current[id]) {
      cardTargets.current[id] = { ...cardTargets.current[id], x: 0, y: 0, lift: 0 }
    }
  }, [])

  return (
    <section ref={ref} className="region" data-reveal id="projects">
      <SectionHeader
        number="02"
        title="Simulation Projects"
        description="Real-world models brought to life with a bit of fiction"
      />
      <div className="cardGrid">
        {PROJECTS.map((project) => {
          const IconComponent = ICON_MAP[project.iconType]
          return (
            <a
              key={project.id}
              className={`card ${project.glowClass}`}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => onLaunch(e, project.id, project.href)}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => {
                setHoveredCard(null)
                handleCardLeave(project.id)
              }}
              onMouseMove={(e) => handleCardMove(e, project.id)}
            >
              <span className="cardGlow" aria-hidden="true" />
              <span className="cardIcon" aria-hidden="true">
                {IconComponent && <IconComponent playing={hoveredCard === project.id} />}
              </span>
              <span className="cardBody">
                <span className="cardTitle">{project.title}</span>
                <span className="cardDesc">{project.description}</span>
              </span>
              <span className="cardArrow" aria-hidden="true">
                →
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default memo(forwardRef(ProjectsSection))
