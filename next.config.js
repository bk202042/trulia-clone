/** @type {import('next').NextConfig} */

// Update the configuration to support image domains
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media-cdn.trulia-local.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'web-assets.same.dev',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        pathname: '**',
      }
    ],
  },

  // Server external packages that need bundling
  serverExternalPackages: ["sequelize"],

  experimental: {
    // CSS optimization
    optimizeCss: true,
  },

  // Force .page extensions to be treated as server components
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  // Production URL for links and SEO
  assetPrefix: process.env.NEXT_PUBLIC_BASE_URL,
};

module.exports = nextConfig;
