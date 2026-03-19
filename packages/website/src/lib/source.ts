import { loader } from "fumadocs-core/source";
import type { InferPageType } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docs } from "fumadocs-mdx:collections/server";

import { i18n } from "@/i18n/config";

export const source = loader({
  baseUrl: "/docs",
  i18n,
  plugins: [lucideIconsPlugin()],
  source: docs.toFumadocsSource(),
});

export const getPageImage = (page: InferPageType<typeof source>) => {
  const pathSegments =
    page.locale === i18n.defaultLanguage
      ? page.slugs
      : [page.locale, ...page.slugs];
  const segments = [...pathSegments, "image.webp"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
};

export const getLLMText = async (page: InferPageType<typeof source>) => {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title}

${processed}`;
};
