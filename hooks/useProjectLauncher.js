import { useState, useCallback, useRef } from 'react';

export default function useProjectLauncher() {
  const [launchState, setLaunchState] = useState(null);
  const launchTimerRef = useRef(null);

  const handleLaunch = useCallback(
    (e, id, url) => {
      e.preventDefault();
      if (launchState) return;

      const r = e.currentTarget.getBoundingClientRect();
      const x = ((r.left + r.width / 2) / window.innerWidth) * 100;
      const y = ((r.top + r.height / 2) / window.innerHeight) * 100;

      setLaunchState({ id, url, x, y });

      launchTimerRef.current = setTimeout(() => {
        window.open(url, '_blank');
        setTimeout(() => setLaunchState(null), 300);
      }, 800);
    },
    [launchState]
  );

  return {
    launchState,
    handleLaunch,
  };
}
