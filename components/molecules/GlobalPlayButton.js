import { memo } from 'react'
import Icon from '@components/atoms/Icon'

function GlobalPlayButton({ isPlaying, hasPlayed, trackTitle, onToggle, onPrev, onNext }) {
  if (!hasPlayed) return null

  return (
    <div className="globalPlayer">
      <button className="globalPlayerBtn gpbSmall" onClick={onPrev} aria-label="Previous track">
        <Icon name="prevTrack" size={12} strokeWidth={2} />
      </button>
      <button className="globalPlayerBtn gpbMain" onClick={onToggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
        <Icon name={isPlaying ? 'pause' : 'play'} size={18} />
        {isPlaying && (
          <span className="gpbRing" aria-hidden="true" />
        )}
      </button>
      <button className="globalPlayerBtn gpbSmall" onClick={onNext} aria-label="Next track">
        <Icon name="nextTrack" size={12} strokeWidth={2} />
      </button>
      {trackTitle && (
        <span className="gpbTitle">{trackTitle}</span>
      )}
    </div>
  )
}

export default memo(GlobalPlayButton)
