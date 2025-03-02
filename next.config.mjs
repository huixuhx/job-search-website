/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

    images: {
      unoptimized: true,
        domains: ["upload.wikimedia.org",
          "www.jobscan.co",
          "cultivatedculture.com",
          "www.resumeworded.com",
        "www.tealhq.com",
      "d1eipm3vz40hy0.cloudfront.net",
    "zety.com"], // 允许加载 Wikimedia 的图片
      },
};

export default nextConfig;
