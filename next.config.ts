import type { NextConfig } from "next";

const apiBaseUrl = process.env.API_BASE_URL?.replace(/\/$/, "");

if (!apiBaseUrl) {
  console.warn(
    "[next.config] API_BASE_URL belum diisi. Panggilan /api/* akan gagal; isi di .env.local atau Environment Variables Vercel.",
  );
}

const apiUrl = apiBaseUrl ? new URL(apiBaseUrl) : null;

const nextConfig: NextConfig = {
  images: apiUrl
    ? {
        remotePatterns: [
          {
            protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
            hostname: apiUrl.hostname,
            port: apiUrl.port,
          },
        ],
        // Backend lokal (127.0.0.1) hanya boleh dioptimasi saat development.
        dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
      }
    : undefined,
  async rewrites() {
    if (!apiBaseUrl) return [];

    // Browser memanggil /api/... di domain Next.js; diteruskan ke Laravel (tanpa CORS).
    return [{ source: "/api/:path*", destination: `${apiBaseUrl}/api/:path*` }];
  },
};

export default nextConfig;
