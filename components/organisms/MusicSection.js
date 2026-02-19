import { forwardRef, memo, useRef } from 'react'
import Icon from '@components/atoms/Icon'
import SectionHeader from '@components/atoms/SectionHeader'
import useAudioReactive from '@hooks/useAudioReactive'
import { SOUNDCLOUD_URL, SOUNDCLOUD_PROFILE } from '@data/constants'

function MusicSection({ theme, iframeRef, trackTitle, playingRef, prev, next }, ref) {
  const musicRegionRef = useRef(null)

  useAudioReactive(musicRegionRef, playingRef)

  return (
    <section className="region" data-reveal id="music">
      <SectionHeader
        number="04"
        title="Beyond Code"
        description="Late-night beats and experiments. Feel free to listen while you scroll."
      />
      <div
        ref={(el) => {
          musicRegionRef.current = el
          if (ref) {
            if (typeof ref === 'function') ref(el)
            else ref.current = el
          }
        }}
        className="musicRegion"
      >
        <h3 className="subsectionTitle">Music</h3>
        <p className="subsectionDesc">
          Beats, loops, and late-night experiments. Mostly electronic, always evolving.
        </p>
        <div className="scPlayer">
          <iframe
            ref={iframeRef}
            title="SoundCloud Player"
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            loading="lazy"
            style={
              theme === 'dark'
                ? { filter: 'invert(1) hue-rotate(180deg) brightness(0.92) contrast(0.9)' }
                : undefined
            }
            src={SOUNDCLOUD_URL}
          />
        </div>
        <div className="scControls">
          <button className="scBtn" onClick={prev} aria-label="Previous track">
            <Icon name="prevTrack" size={16} strokeWidth={2} />
          </button>
          <span className="scTrackTitle">{trackTitle || '\u00A0'}</span>
          <button className="scBtn" onClick={next} aria-label="Next track">
            <Icon name="nextTrack" size={16} strokeWidth={2} />
          </button>
        </div>
        <a className="scLink" href={SOUNDCLOUD_PROFILE} target="_blank" rel="noopener noreferrer">
          More on SoundCloud →
        </a>
      </div>
    </section>
  )
}

export default memo(forwardRef(MusicSection))
