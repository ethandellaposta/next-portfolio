import dynamic from 'next/dynamic';
import SEOHead from '@components/organisms/SEOHead';
import ScrollProgress from '@components/atoms/ScrollProgress';
import NavBar from '@components/molecules/NavBar';
import AmbientBackground from '@components/layout/AmbientBackground';
import SiteFooter from '@components/organisms/SiteFooter';
import SkipLink from '@components/atoms/SkipLink';

const ParticleNetwork = dynamic(() => import('@components/ParticleNetwork'), {
  ssr: false,
});
const GlobalPlayButton = dynamic(
  () => import('@components/molecules/GlobalPlayButton'),
  { ssr: false }
);

export default function SceneWrapper({
  children,
  progress,
  navSolid,
  theme,
  onToggleTheme,
  launchState,
  spotlightRef,
  musicProps,
  pageMeta = {},
}) {
  // Default musicProps for pages that don't have music
  const safeMusicProps = musicProps || {
    isPlaying: false,
    hasPlayed: false,
    trackTitle: '',
    toggle: () => {},
    prev: () => {},
    next: () => {},
  };

  return (
    <div
      className={`scene${launchState ? ` launch-${launchState.id} launching` : ''}`}
      style={
        launchState
          ? { '--lx': `${launchState.x}%`, '--ly': `${launchState.y}%` }
          : undefined
      }
    >
      <SkipLink href="#main-content" />
      <SEOHead pageMeta={pageMeta} />
      <ScrollProgress progress={progress} />
      <NavBar navSolid={navSolid} theme={theme} onToggleTheme={onToggleTheme} />

      <ParticleNetwork />

      {/* Spotlight */}
      <div ref={spotlightRef} className="spotlight" aria-hidden="true" />

      {/* Ambient background */}
      <AmbientBackground />

      {/* Launch tunnel overlay */}
      <div className="tunnel" aria-hidden="true" />

      <main id="main-content" tabIndex="-1">
        {children}
      </main>

      <GlobalPlayButton
        isPlaying={safeMusicProps.isPlaying}
        hasPlayed={safeMusicProps.hasPlayed}
        trackTitle={safeMusicProps.trackTitle}
        onToggle={safeMusicProps.toggle}
        onPrev={safeMusicProps.prev}
        onNext={safeMusicProps.next}
      />

      <SiteFooter />
    </div>
  );
}
