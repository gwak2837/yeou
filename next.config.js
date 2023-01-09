const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  buildExcludes: [
    // /\/*server\/middleware-chunks\/[0-9]*[a-z]*[A-Z]*\.js$/,
    /app-build-manifest\.json$/,
    // /middleware-runtime\.js$/,
    // /_middleware\.js$/,
    // /^.+\\_middleware\.js$/,
  ],
  publicExcludes: ['!robots.txt'],
  customWorkerDir: 'src/worker',
  dest: 'public',
  runtimeCaching,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
      ],
    },
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: '**.coupangcdn.com' },
    ],
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = withPWA(nextConfig)
