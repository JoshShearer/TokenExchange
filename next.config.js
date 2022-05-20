/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
}); 

const nextConfig = {
  reactStrictMode: true,
  rootDir: 'src',
  images: {
    domains: ['external-content.duckduckgo.com',
              'images.unsplash.com'],
  },
}

module.exports = withBundleAnalyzer(nextConfig);
