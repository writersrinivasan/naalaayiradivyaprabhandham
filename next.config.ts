import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the PDF build run a production server next to `npm run dev` (see scripts/build_pdfs.mjs).
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
