import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "afrwytnbszqpceznbxzj.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
