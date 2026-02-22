import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@data/constants';

export function getStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: 'Senior Software Engineer — Full Stack Developer for Hire',
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: `${SITE_NAME} — Senior Software Engineer | Full Stack Developer for Hire`,
        description: SITE_DESCRIPTION,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        inLanguage: 'en-US',
        dateModified: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'Senior Software Engineer',
        worksFor: {
          '@type': 'Organization',
          name: 'SRC',
          url: 'https://www.srcinc.com',
        },
        alumniOf: [
          { '@type': 'Organization', name: 'Yumi' },
          { '@type': 'Organization', name: 'Acquia' },
          { '@type': 'Organization', name: 'urspace' },
        ],
        knowsAbout: [
          'Full Stack Development',
          'React',
          'Next.js',
          'TypeScript',
          'Node.js',
          'C++',
          'Radar Signal Processing',
          'Real-Time Systems',
          'GraphQL',
          'MySQL',
          'AWS',
          'Docker',
          'Kubernetes',
          'Go',
          'Linux',
          'gRPC',
          'Protobuf',
          'WebGL',
          'Feathers.js',
        ],
        sameAs: [
          'https://linkedin.com/in/ethan-della-posta',
          'https://github.com/ethandellaposta',
          'https://soundcloud.com/ethan-della-posta-86937754',
        ],
        email: 'mailto:ethanjdellaposta@gmail.com',
        description: SITE_DESCRIPTION,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: `${SITE_NAME} — Freelance Software Engineering`,
        provider: { '@id': `${SITE_URL}/#person` },
        url: SITE_URL,
        description:
          'Freelance full-stack software engineering services. Web apps, APIs, real-time systems, radar software, and simulations.',
        areaServed: { '@type': 'Place', name: 'Worldwide' },
        serviceType: [
          'Web Application Development',
          'Full Stack Development',
          'API Development',
          'Frontend Development',
          'Backend Development',
          'Radar Software Engineering',
          'Real-Time Simulation Development',
          'Software Consulting',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Software Engineering Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Full Stack Web Development',
                description:
                  'End-to-end web application development with React, Next.js, Node.js',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Radar & DSP Software',
                description:
                  'Signal processing pipelines, real-time data acquisition, C++ systems',
              },
            },
          ],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#projects`,
        name: 'Portfolio Projects',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'SoftwareApplication',
              name: 'Evolution Simulator',
              url: 'https://evoio.ethandellaposta.dev',
              applicationCategory: 'Simulation',
              description:
                'Real-time single and multicellular life evolution simulator',
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'SoftwareApplication',
              name: 'Solar System Simulator',
              url: 'https://solarsystemsim.ethandellaposta.dev',
              applicationCategory: 'Simulation',
              description:
                'Real-time model of our solar system with accurate orbital mechanics',
            },
          },
        ],
      },
    ],
  };
}
