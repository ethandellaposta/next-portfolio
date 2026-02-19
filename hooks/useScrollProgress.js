import { useState, useEffect } from 'react'

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [navSolid, setNavSolid] = useState(false)

  useEffect(() => {
    function onScroll() {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? Math.min(1, window.scrollY / docH) : 0)
      setNavSolid(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { progress, navSolid }
}
