import withRoutes from 'nextjs-routes/config';
withRoutes();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
