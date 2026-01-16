/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sml.boutique',
                pathname: '/**',
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
};

export default nextConfig;
