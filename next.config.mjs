/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

if (process.env.NODE_ENV === 'development') {
  Object.assign(nextConfig, {
    server: {
      port: 4000,
    },
  });
}

export default nextConfig; 