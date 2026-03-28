import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  headers() {
    return [
      {
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
        source: "/_next/static/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      { hostname: "unavatar.io", protocol: "https" },
      { hostname: "api.dicebear.com", protocol: "https" },
    ],
  },
  reactStrictMode: true,
  rewrites() {
    return {
      beforeFiles: [
        {
          destination: "/llms.txt",
          source: "/llm.txt",
        },
        {
          destination: "/install-skill",
          source: "/install-skill.sh",
        },
        {
          destination: "/en/share",
          source: "/share",
        },
      ],
    };
  },
  serverExternalPackages: ["@takumi-rs/image-response"],
};

export default withMDX(config);
