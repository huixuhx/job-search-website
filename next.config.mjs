/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

    images: {
      unoptimized: false,
    },
    compiler: {
      styledComponents: true, // 确保 Next.js 处理 styled-components
    },
    
};

export default nextConfig;
