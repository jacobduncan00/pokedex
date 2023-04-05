/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["play.pokemonshowdown.com", "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
