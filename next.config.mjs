import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "hackmyatravel.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "www.hackmyatravel.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
