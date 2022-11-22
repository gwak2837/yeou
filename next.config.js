const withPWA = require('next-pwa')({
  customWorkerDir: 'src/worker',
  dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // i18n: {
  //   locales: ['ko-KR', 'en'],
  //   defaultLocale: 'ko-KR',
  // },
  images: {
    domains: [
      'storage.googleapis.com',
      'k.kakaocdn.net',
      // coopang
    ],
  },
  // output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = withPWA(nextConfig)
