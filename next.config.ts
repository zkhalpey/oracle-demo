import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/oracle-demo",
  assetPrefix: "/oracle-demo/",
};
export default nextConfig;
