/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  reactStrictMode: true,
  reactCompiler: true,
};

export default nextConfig;
