/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      remotePatterns: [
        {
          hostname: '**',
        },
      ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
export default nextConfig;
