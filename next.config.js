const withPWA = require('next-pwa')({
  customWorkerDir: 'src/worker',
  dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: '**.coupangcdn.com' },
    ],
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = withPWA(nextConfig)
