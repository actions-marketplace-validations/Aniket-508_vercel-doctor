import type { Metadata } from "next";

import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
}

const createMetadata = (options: CreateMetadataOptions = {}): Metadata => {
  const {
    title,
    description = SITE.DESCRIPTION.SHORT,
    canonical,
    ogTitle,
    ogDescription,
    noIndex = false,
  } = options;

  return {
    ...(title && { title }),
    description,
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    openGraph: {
      description: ogDescription || description,
      images: [
        {
          alt: `${SITE.NAME} - Optimize Next.js costs`,
          height: 630,
          url: SITE.OG_IMAGE,
          width: 1200,
        },
      ],
      title: ogTitle || title || SITE.NAME,
      type: "website",
      url: canonical ? `${SITE.URL}${canonical}` : SITE.URL,
    },
    twitter: {
      card: "summary_large_image",
      description: ogDescription || description,
      images: [SITE.OG_IMAGE],
      title: ogTitle || title || SITE.NAME,
    },
    ...(noIndex && {
      robots: {
        follow: false,
        index: false,
      },
    }),
  };
};

const baseMetadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE.NAME,
  },
  applicationName: SITE.NAME,
  authors: [{ name: SITE.AUTHOR.NAME, url: LINK.TWITTER }],
  category: "technology",
  creator: SITE.AUTHOR.NAME,
  description: SITE.DESCRIPTION.LONG,
  icons: { icon: "/favicon.svg" },
  keywords: [...SITE.KEYWORDS],
  metadataBase: new URL(SITE.URL),
  openGraph: {
    description: SITE.DESCRIPTION.SHORT,
    images: [
      {
        alt: `${SITE.NAME} - Optimize Next.js projects for Vercel`,
        height: 630,
        url: SITE.OG_IMAGE,
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: SITE.NAME,
    title: SITE.NAME,
    type: "website",
    url: SITE.URL,
  },
  publisher: SITE.AUTHOR.NAME,
  title: {
    default: `${SITE.NAME} | Optimize Next.js projects for Vercel`,
    template: `%s | ${SITE.NAME}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.AUTHOR.TWITTER,
    description: SITE.DESCRIPTION.SHORT,
    images: [SITE.OG_IMAGE],
    site: SITE.AUTHOR.TWITTER,
    title: `${SITE.NAME} | Optimize Next.js projects for Vercel`,
  },
};

export { baseMetadata, createMetadata };
