import type { NextConfig } from "next";

const destination = process.env.API_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${destination}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
