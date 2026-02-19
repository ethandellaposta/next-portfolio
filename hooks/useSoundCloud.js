import { useCallback, useEffect, useRef, useState } from 'react'

export default function useSoundCloud(iframeRef) {
  const widgetRef = useRef(null)
  const playingRef = useRef(false)
  const [trackTitle, setTrackTitle] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    function bindWidget() {
      const iframe = iframeRef.current
      if (!iframe || !window.SC) return
      try {
        const widget = window.SC.Widget(iframe)
        widgetRef.current = widget
        widget.bind(window.SC.Widget.Events.READY, () => {
          widget.bind(window.SC.Widget.Events.PLAY, () => {
            playingRef.current = true
            setIsPlaying(true)
            setHasPlayed(true)
            widget.getCurrentSound((sound) => {
              if (sound && sound.title) setTrackTitle(sound.title)
            })
          })
          widget.bind(window.SC.Widget.Events.PAUSE, () => {
            playingRef.current = false
            setIsPlaying(false)
          })
          widget.bind(window.SC.Widget.Events.FINISH, () => {
            playingRef.current = false
            setIsPlaying(false)
          })
        })
      } catch (e) {
        /* widget not ready */
      }
    }

    if (window.SC) {
      bindWidget()
    } else {
      const script = document.createElement('script')
      script.src = 'https://w.soundcloud.com/player/api.js'
      script.async = true
      script.onload = bindWidget
      document.body.appendChild(script)
    }
  }, [iframeRef])

  const prev = useCallback(() => widgetRef.current && widgetRef.current.prev(), [])
  const next = useCallback(() => widgetRef.current && widgetRef.current.next(), [])

  const toggle = useCallback(() => {
    if (!widgetRef.current) return
    widgetRef.current.toggle()
  }, [])

  return { trackTitle, playingRef, isPlaying, hasPlayed, prev, next, toggle }
}
