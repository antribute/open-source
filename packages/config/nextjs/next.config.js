const withRoutes = require('nextjs-routes/config')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['api.ts', 'page.tsx'],
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // This error gets kicked off from an issue inside of the auth0 node library. For more info see
    // https://github.com/auth0/node-auth0/blob/master/FAQ.md
    config.resolve.alias = { ...config.resolve.alias, 'superagent-proxy': false };
    return config;
  },
};

module.exports = withRoutes(nextConfig);
