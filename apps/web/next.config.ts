import type { NextConfig } from "next"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return [
      {
        // The frontend is pure UI: every /api/* call is proxied to the
        // backend (apps/api). Same-origin from the browser's point of view, so
        // session cookies work without cross-origin configuration.
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
