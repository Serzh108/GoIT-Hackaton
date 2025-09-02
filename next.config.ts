import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* My addition! */
    async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://inharmony-v2.h.goit.study/api/:path*",
      },
    ];
  },
};

export default nextConfig;
