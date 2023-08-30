/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "live.staticflickr.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "images.pexels.com" },
      { hostname: "cdn.pixabay.com" },
    ],
  },
};

module.exports = nextConfig;
