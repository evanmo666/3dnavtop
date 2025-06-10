import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 部署时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 部署时忽略TypeScript错误
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
