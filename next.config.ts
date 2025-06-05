import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    // Add other origins as needed
  ],
  images: {
    domains: ["images.pexels.com", "i.pravatar.cc"], // Add all required domains
  },
};

export default nextConfig;
