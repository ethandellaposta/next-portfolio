import { useEffect, useRef } from 'react';

export default function useAudioReactive(musicSectionRef, playingRef) {
  const rafRef = useRef(null);

  useEffect(() => {
    let smoothEnergy = 0;
    let smoothBass = 0;
    let smoothMid = 0;
    let smoothHigh = 0;

    function tick() {
      const el = musicSectionRef.current;
      if (!el) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const isPlaying = playingRef.current;
      const t = Date.now() / 1000;

      let tEnergy = 0,
        tBass = 0,
        tMid = 0,
        tHigh = 0;

      if (isPlaying) {
        tBass =
          0.45 +
          0.3 * Math.sin(t * 2.1) * Math.sin(t * 0.7) +
          0.15 * Math.sin(t * 4.3 + 0.5) +
          0.1 * Math.abs(Math.sin(t * 8.7));

        tMid =
          0.35 +
          0.2 * Math.sin(t * 3.2 + 1.0) +
          0.15 * Math.sin(t * 5.8 + 2.1) +
          0.1 * Math.sin(t * 1.4);

        tHigh =
          0.2 +
          0.15 * Math.sin(t * 7.3 + 0.8) +
          0.1 * Math.sin(t * 11.2 + 1.5) +
          0.08 * Math.sin(t * 2.9);

        tEnergy = tBass * 0.5 + tMid * 0.3 + tHigh * 0.2;
      }

      const attack = isPlaying ? 0.15 : 0.04;
      smoothEnergy += (tEnergy - smoothEnergy) * attack;
      smoothBass += (tBass - smoothBass) * attack;
      smoothMid += (tMid - smoothMid) * attack;
      smoothHigh += (tHigh - smoothHigh) * attack;

      el.style.setProperty('--energy', Math.max(0, smoothEnergy).toFixed(3));
      el.style.setProperty('--bass', Math.max(0, smoothBass).toFixed(3));
      el.style.setProperty('--mid', Math.max(0, smoothMid).toFixed(3));
      el.style.setProperty('--high', Math.max(0, smoothHigh).toFixed(3));

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [musicSectionRef, playingRef]);
}
