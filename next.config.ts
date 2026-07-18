import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www を non-www（正規ホスト）へ 301 リダイレクトし、重複ホストを解消
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.yukue.net" }],
        destination: "https://yukue.net/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
