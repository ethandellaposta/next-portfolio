import Head from 'next/head'
import { memo } from 'react'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@data/constants'
import { getStructuredData } from '@lib/seo'

function SEOHead() {
  const title = `${SITE_NAME} — Senior Software Engineer | Full Stack Developer for Hire`
  const ogTitle = `${SITE_NAME} — Senior Software Engineer | Available for Freelance`
  const ogDescription =
    'Full-stack engineer building mission-critical radar software, interactive web apps, and real-time simulations. Open to freelance opportunities.'
  const twitterDescription =
    'Full-stack engineer specializing in React, Next.js, C++, and radar systems. Available for freelance projects.'

  return (
    <Head>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={SITE_DESCRIPTION} />
      <meta
        name="keywords"
        content="freelance software engineer, full stack developer, senior software engineer, React developer, Next.js developer, C++ developer, radar software, web development, freelance web developer, hire software engineer, real-time simulations, radar signal processing"
      />
      <meta name="author" content={SITE_NAME} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <link rel="canonical" href={SITE_URL} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — Portfolio`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${SITE_NAME} — Senior Software Engineer`} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#0f1117" media="(prefers-color-scheme: dark)" />
      <meta name="theme-color" content="#f5f6fa" media="(prefers-color-scheme: light)" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="https://w.soundcloud.com" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
      />
    </Head>
  )
}

export default memo(SEOHead)
