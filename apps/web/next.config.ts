import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@bond/ui', '@bond/wallet', '@bond/state', '@bond/api'],
};

export default nextConfig;
