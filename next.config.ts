import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://d32dm0rphc51dk.cloudfront.net/**")],
  },
};

export default nextConfig;
