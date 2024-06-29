/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'vaxjykeihsernxqxeyiy.supabase.co',
          port: '',
        },
      ],
    },
}
export default nextConfig;
