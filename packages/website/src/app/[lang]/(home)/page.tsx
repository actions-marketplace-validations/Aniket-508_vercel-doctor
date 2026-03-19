import type { Metadata } from "next";

import { DisclaimerBanner } from "@/components/landing/disclaimer-banner";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { PreFooter } from "@/components/landing/pre-footer";
import { Testimonials } from "@/components/landing/testimonials";
import { ROUTES } from "@/constants/routes";
import { i18n } from "@/i18n/config";
import { withLocalePrefix } from "@/i18n/navigation";
import { createMetadata } from "@/seo/metadata";
import { getTranslation } from "@/translations";

export const generateStaticParams = () =>
  i18n.languages.map((lang) => ({ lang }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> => {
  const { lang } = await params;
  const translation = getTranslation(lang);
  const title = `${translation.hero.headingLine1} ${translation.hero.headingLine2}`;

  return createMetadata({
    canonical: withLocalePrefix(lang, ROUTES.HOME),
    description: translation.hero.subtitle,
    title,
  });
};

const HomePage = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const translation = getTranslation(lang);

  return (
    <>
      <DisclaimerBanner translation={translation} />
      <Hero translation={translation} lang={lang} />
      <Testimonials translation={translation} />
      <PreFooter translation={translation} lang={lang} />
      <Footer translation={translation} />
    </>
  );
};

export default HomePage;
