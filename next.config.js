/** @type {import('next').NextConfig} */
module.exports = {
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
