/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io", "admin.raelli.az", "localhost:3000"],
  },
  experimental: {
    appDir: true,
  },
  //experimental
};

module.exports = nextConfig;
