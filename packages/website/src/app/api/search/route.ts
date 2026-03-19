import { createFromSource } from "fumadocs-core/search/server";

import { source } from "@/lib/source";

export const { GET } = createFromSource(source, {
  localeMap: {
    zh: "english",
    ja: "english",
    ko: "english",
    hi: "indian",
    da: "danish",
    "pt-br": "portuguese",
  },
});
