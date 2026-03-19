import { DisclaimerBanner } from "@/components/landing/disclaimer-banner";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { PreFooter } from "@/components/landing/pre-footer";
import { Testimonials } from "@/components/landing/testimonials";
import { i18n } from "@/i18n/config";
import { getTranslation } from "@/translations";

export const generateStaticParams = () =>
  i18n.languages.map((lang) => ({ lang }));

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
