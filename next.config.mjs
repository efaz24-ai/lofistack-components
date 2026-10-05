/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export", // static site for GitHub Pages
  trailingSlash: true, // /components/glass-button/ -> index.html
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
