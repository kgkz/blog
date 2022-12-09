/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '**',
        pathname: '/**/*',
      },
    ],
    formats: ['image/webp'],
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
}

module.exports = withBundleAnalyzer(config)
