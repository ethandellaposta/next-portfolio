import { memo } from 'react'

function ScrollProgress({ progress }) {
  return (
    <div
      className="scrollProgress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
    />
  )
}

export default memo(ScrollProgress)
