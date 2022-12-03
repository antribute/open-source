const withRoutes = require('nextjs-routes/config')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['api.ts', 'page.tsx'],
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withRoutes(nextConfig);
