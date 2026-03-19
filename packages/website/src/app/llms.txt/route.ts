import { i18n } from "@/i18n/config";
import { source } from "@/lib/source";

export const revalidate = false;

export const GET = () => {
  const docPages = source
    .getPages()
    .filter((page) => page.locale === i18n.defaultLanguage);
  const lines = [
    "# Documentation",
    "",
    ...docPages.map(
      (page) => `- [${page.data.title}](${page.url}): ${page.data.description}`,
    ),
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown" },
  });
};
