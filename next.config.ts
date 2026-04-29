import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        basePath: process.env.PAGES_BASE_PATH ?? "",
      }
    : {}),
  images: {
    unoptimized: isStaticExport,
  },
};

export default nextConfig;
