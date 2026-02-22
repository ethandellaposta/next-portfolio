import '@styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorBoundary from '@components/atoms/ErrorBoundary';
import PageTransition from '@components/atoms/PageTransition';
import useSmoothScroll from '@hooks/useSmoothScroll';

function Application({ Component, pageProps }) {
  useSmoothScroll();
  const router = useRouter();
  const [transitionState, setTransitionState] = useState('entered');

  useEffect(() => {
    const handleStart = () => setTransitionState('exiting');
    const handleDone = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTransitionState('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionState('entered'));
      });
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError', handleDone);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError', handleDone);
    };
  }, [router]);

  return (
    <ErrorBoundary>
      <PageTransition state={transitionState}>
        <Component {...pageProps} />
      </PageTransition>
    </ErrorBoundary>
  );
}

export default Application;
