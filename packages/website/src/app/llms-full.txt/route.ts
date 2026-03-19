import { i18n } from "@/i18n/config";
import { getLLMText, source } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const scan = source
    .getPages()
    .filter((page) => page.locale === i18n.defaultLanguage)
    .map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join("\n\n"), {
    headers: { "Content-Type": "text/markdown" },
  });
}
