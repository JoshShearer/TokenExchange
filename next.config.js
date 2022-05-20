/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['external-content.duckduckgo.com',
              'images.unsplash.com'],
  },
}

module.exports = nextConfig
