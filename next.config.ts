import { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    AI_GATEWAY_API_KEY: process.env.AI_GATEWAY_API_KEY,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
