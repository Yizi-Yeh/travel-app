import { createRequire } from "module";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
};

try {
  const withPWA = require("next-pwa");
  nextConfig = withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
  })(nextConfig);
} catch {
  // next-pwa is optional for environments without dependencies installed
}

export default nextConfig;
