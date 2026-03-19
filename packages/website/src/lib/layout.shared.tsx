import { LogoMark } from "@/components/logo";
import { LINK } from "@/constants/links";
import { i18n } from "@/i18n/config";
import { ROUTES } from "@/constants/routes";
import { withLocalePrefix } from "@/i18n/navigation";
import { getTranslation } from "@/translations";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions = (locale: string): BaseLayoutProps => {
  const translation = getTranslation(locale);

  return {
    i18n,
    nav: {
      title: (
        <>
          <LogoMark className="h-6" />
          Vercel Doctor
        </>
      ),
    },
    links: [
      { text: translation.nav.docs, url: withLocalePrefix(locale, ROUTES.DOCS) },
      { text: translation.nav.showcase, url: withLocalePrefix(locale, ROUTES.SHOWCASE) },
      { text: translation.nav.sponsors, url: withLocalePrefix(locale, ROUTES.SPONSORS) },
    ],
    githubUrl: LINK.GITHUB,
  };
};
