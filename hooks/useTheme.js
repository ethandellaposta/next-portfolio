import { useState, useEffect, useCallback } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const stored = document.documentElement.getAttribute('data-theme') || 'dark'
    setTheme(stored)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try { localStorage.setItem('theme', next) } catch (e) {}
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
