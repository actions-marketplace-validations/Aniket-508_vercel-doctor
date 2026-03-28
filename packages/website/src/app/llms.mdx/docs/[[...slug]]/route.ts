import { notFound } from "next/navigation";

import { isLocale } from "@/i18n/config";
import { getLLMText, source } from "@/lib/source";

export const revalidate = false;

export const GET = async (
  _req: Request,
  { params }: RouteContext<"/llms.mdx/docs/[[...slug]]">,
) => {
  const { slug = [] } = await params;

  let lang: string | undefined;
  let pageSlug = slug;

  const [first, ...rest] = slug;
  if (isLocale(first ?? "")) {
    if (rest.length > 0) {
      lang = first;
      pageSlug = rest;
    } else if (slug.length === 1) {
      lang = first;
      pageSlug = [];
    }
  }

  const page = source.getPage(pageSlug, lang);
  if (!page) {
    notFound();
  }

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};

export const generateStaticParams = () => source.generateParams();
