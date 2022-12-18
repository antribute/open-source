import withRoutes from 'nextjs-routes/config';
withRoutes();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['api.ts', 'page.tsx', 'api.js', 'page.js'],
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // This error gets kicked off from an issue inside of the auth0 node library. For more info see
    // https://github.com/auth0/node-auth0/blob/master/FAQ.md
    config.resolve.alias = { ...config.resolve.alias, 'superagent-proxy': false };
    return config;
  },
};

export default nextConfig;
