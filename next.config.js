/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Enable static export for GitHub Actions deployment
  output: 'export',
  // Remove images optimization for static export
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
