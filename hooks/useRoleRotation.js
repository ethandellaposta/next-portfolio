import { useState, useEffect } from 'react'

export default function useRoleRotation(roles, intervalMs = 3000) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length)
        setVisible(true)
      }, 400)
    }, intervalMs)
    return () => clearInterval(interval)
  }, [roles.length, intervalMs])

  return { role: roles[index], visible }
}
