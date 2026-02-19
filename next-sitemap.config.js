/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ethandellaposta.dev',
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
}
