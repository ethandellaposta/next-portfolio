import Head from 'next/head';
import { memo } from 'react';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@data/constants';
import { getStructuredData } from '@lib/seo';

function SEOHead({ pageMeta = {} }) {
  const {
    title = `${SITE_NAME} — Senior Software Engineer | Full Stack Developer for Hire`,
    description = SITE_DESCRIPTION,
    ogTitle = `${SITE_NAME} — Senior Software Engineer | Available for Freelance`,
    ogDescription = 'Full-stack engineer building mission-critical radar software, interactive web apps, and real-time simulations. Open to freelance opportunities.',
    ogImage = `${SITE_URL}/og-image.png`,
    canonical = SITE_URL,
    noIndex = false,
  } = pageMeta;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="freelance software engineer, full stack developer, senior software engineer, React developer, Next.js developer, C++ developer, radar software, web development, freelance web developer, hire software engineer, real-time simulations, radar signal processing, TypeScript, Node.js, AWS, Docker"
      />
      <meta name="author" content={SITE_NAME} />
      <meta name="creator" content={SITE_NAME} />
      <meta name="publisher" content={SITE_NAME} />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex,nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0f1117" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — Portfolio`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} — Portfolio`} />
      <meta name="twitter:creator" content="@ethandellaposta" />
      <meta name="twitter:site" content="@ethandellaposta" />

      {/* Additional SEO */}
      <meta
        name="theme-color"
        content="#0f1117"
        media="(prefers-color-scheme: dark)"
      />
      <meta
        name="theme-color"
        content="#f5f6fa"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="msapplication-TileColor" content="#0f1117" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Performance */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="https://w.soundcloud.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData()),
        }}
      />
    </Head>
  );
}

export default memo(SEOHead);
