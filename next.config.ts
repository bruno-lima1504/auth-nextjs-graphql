import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// next.config.js
module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "https://auth-nestjs-graphql.onrender.com/graphql",
      },
    ];
  },
};

export default nextConfig;
