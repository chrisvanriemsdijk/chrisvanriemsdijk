import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactCompiler: true,
  experimental: {
    // The dev filesystem cache (beta, on by default in Next 16) kept serving a
    // stale globals.css across edits and restarts. Off until it is stable.
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
