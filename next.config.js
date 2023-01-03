/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    API_URL: "http://34.111.80.179"
  }
}

module.exports = nextConfig
