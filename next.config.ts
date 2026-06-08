import type { NextConfig } from "next";

const destination = process.env.API_URL || "https://task-flow-server-eight.vercel.app";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${destination}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
