import { useEffect, useRef } from 'react'

export default function useHeaderParallax() {
  const rafRef = useRef(null)
  const currentY = useRef({})

  useEffect(() => {
    const LERP = 0.05
    const SPEED = 0.8

    function tick() {
      const headers = document.querySelectorAll('.sectionHeaderSticky')
      const vh = window.innerHeight

      headers.forEach((h, i) => {
        const rect = h.getBoundingClientRect()
        // How far the element top is from viewport center, normalized
        const fromCenter = (rect.top - vh * 0.4) / vh
        // Target Y: headers above center drift up, below drift down (parallax lag)
        const targetY = fromCenter * SPEED * -60

        // Lerp for buttery smooth motion
        const prev = currentY.current[i] || 0
        const next = prev + (targetY - prev) * LERP
        currentY.current[i] = next

        h.style.transform = `translate3d(0, ${next}px, 0)`
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.querySelectorAll('.sectionHeaderSticky').forEach((h) => {
        h.style.transform = ''
      })
    }
  }, [])
}
