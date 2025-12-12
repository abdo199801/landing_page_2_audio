import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
  allowedDevOrigins: [
    'http://172.24.48.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ]
};

export default nextConfig;
