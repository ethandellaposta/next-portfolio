import { useEffect, useRef } from 'react'

export default function useSpotlight({ heroRef, devRef, careerRef, musicRef, spotlightRef, lightsRef }) {
  useEffect(() => {
    let spotState = { x: 50, y: 50, h: 230, s: 70, l: 30, size: 50 }
    let spotTarget = { ...spotState }
    let animating = true

    function parseHSL(str) {
      const m = str.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/)
      return m ? { h: +m[1], s: +m[2], l: +m[3] } : null
    }

    function updateTarget() {
      const vh = window.innerHeight
      const mid = vh / 2
      const sections = [
        { el: heroRef.current, x: 30, h: 230, s: 70, l: 30, size: 50 },
        { el: devRef.current, x: 50, h: 210, s: 65, l: 28, size: 45 },
        { el: careerRef.current, x: 50, h: 260, s: 55, l: 28, size: 55, dynamic: true },
        { el: musicRef.current, x: 50, h: 300, s: 40, l: 25, size: 45 }
      ]
      let best = null
      let bestDist = Infinity
      for (const s of sections) {
        if (!s.el) continue
        const r = s.el.getBoundingClientRect()
        const center = r.top + r.height / 2
        const dist = Math.abs(center - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = { ...s, viewY: (center / vh) * 100 }
        }
      }
      if (best) {
        if (best.dynamic) {
          const cpEl = best.el.querySelector('[data-accent]')
          if (cpEl && cpEl.dataset.accent) {
            const parsed = parseHSL(cpEl.dataset.accent)
            if (parsed) {
              best.h = parsed.h
              best.s = parsed.s
              best.l = Math.min(parsed.l, 35)
            }
          }
        }
        const y = Math.max(35, Math.min(65, best.viewY))
        spotTarget = { x: best.x, y, h: best.h, s: best.s, l: best.l, size: best.size }
      }
    }

    function onScroll() {
      const sy = window.scrollY
      const container = lightsRef.current
      if (container) {
        const lights = container.children
        for (let i = 0; i < lights.length; i++) {
          const speed = parseFloat(lights[i].dataset.speed || 0)
          lights[i].style.transform = `translate(-50%, -50%) translate3d(0, ${sy * speed}px, 0)`
        }
      }
      updateTarget()
    }

    function tick() {
      if (!animating) return
      const ease = 0.04
      spotState.x += (spotTarget.x - spotState.x) * ease
      spotState.y += (spotTarget.y - spotState.y) * ease
      spotState.h += (spotTarget.h - spotState.h) * ease
      spotState.s += (spotTarget.s - spotState.s) * ease
      spotState.l += (spotTarget.l - spotState.l) * ease
      spotState.size += (spotTarget.size - spotState.size) * ease

      const spot = spotlightRef.current
      if (spot) {
        const { x, y, h, s, l, size } = spotState
        const isLight = document.documentElement.getAttribute('data-theme') === 'light'
        if (isLight) {
          spot.style.background = `radial-gradient(ellipse ${size}vmax ${size}vmax at ${x}% ${y}%, hsla(${h}, ${Math.min(s + 15, 80)}%, 75%, 0.18) 0%, transparent 70%)`
        } else {
          spot.style.background = `radial-gradient(ellipse ${size}vmax ${size}vmax at ${x}% ${y}%, hsla(${h}, ${s}%, ${l}%, 0.4) 0%, transparent 70%)`
        }
      }
      requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    requestAnimationFrame(tick)
    return () => {
      animating = false
      window.removeEventListener('scroll', onScroll)
    }
  }, [heroRef, devRef, careerRef, musicRef, spotlightRef, lightsRef])
}
