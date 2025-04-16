import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [new URL("https://d32dm0rphc51dk.cloudfront.net/**")],
  },
};

export default nextConfig;
