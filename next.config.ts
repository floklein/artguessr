import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [new URL("https://www.artic.edu/**")],
  },
};

export default nextConfig;
