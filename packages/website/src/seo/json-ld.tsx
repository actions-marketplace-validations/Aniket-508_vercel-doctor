/* eslint-disable react/no-danger -- JSON-LD requires injecting script body */
import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";
import { i18n } from "@/i18n/config";

const LOCALE_TO_BCP47: Record<string, string> = {
  en: "en-US",
  "pt-br": "pt-BR",
  zh: "zh-Hans",
};

const WebsiteJsonLd = () => {
  const inLanguage = i18n.languages.map(
    (locale) => LOCALE_TO_BCP47[locale] ?? locale,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: SITE.DESCRIPTION.LONG,
    inLanguage,
    name: SITE.NAME,
    url: SITE.URL,
  };

  return (
    /* eslint-disable-next-line react/no-danger -- JSON-LD script content */
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const SoftwareSourceCodeJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    author: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
    codeRepository: LINK.GITHUB,
    description: SITE.DESCRIPTION.LONG,
    isAccessibleForFree: true,
    keywords: SITE.KEYWORDS.join(", "),
    license: LINK.LICENSE,
    name: SITE.NAME,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
    },
    programmingLanguage: ["TypeScript", "JavaScript"],
    runtimePlatform: "Node.js",
    url: SITE.URL,
  };

  return (
    /* eslint-disable-next-line react/no-danger -- JSON-LD script content */
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    logo: `${SITE.URL}${SITE.OG_IMAGE}`,
    name: SITE.NAME,
    sameAs: [LINK.GITHUB, LINK.TWITTER],
    url: SITE.URL,
  };

  return (
    /* eslint-disable-next-line react/no-danger -- JSON-LD script content */
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const FAQJsonLd = () => {
  const faqs = [
    {
      answer: `${SITE.NAME} is an open-source tool for Next.js projects that identifies patterns increasing your Vercel costs, such as long function durations, uncached routes, and unnecessary invocations.`,
      question: "What is Vercel Doctor?",
    },
    {
      answer:
        "You can run it via npx: `npx -y vercel-doctor@latest .`. Use `--verbose` for detailed reports.",
      question: "How do I use Vercel Doctor?",
    },
    {
      answer: `Yes, ${SITE.NAME} is completely free and open-source under the MIT license.`,
      question: "Is Vercel Doctor free?",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
      name: faq.question,
    })),
  };

  return (
    /* eslint-disable-next-line react/no-danger -- JSON-LD script content */
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const JsonLdScripts = () => (
  <>
    <WebsiteJsonLd />
    <SoftwareSourceCodeJsonLd />
    <OrganizationJsonLd />
    <FAQJsonLd />
  </>
);

export {
  JsonLdScripts,
  WebsiteJsonLd,
  SoftwareSourceCodeJsonLd,
  OrganizationJsonLd,
  FAQJsonLd,
};
