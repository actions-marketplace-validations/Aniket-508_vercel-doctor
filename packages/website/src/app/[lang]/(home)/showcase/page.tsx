import { PlusIcon } from "lucide-react";
import type { Metadata } from "next";

import { Footer } from "@/components/landing/footer";
import {
  SectionContainer,
  SectionContent,
} from "@/components/landing/section-layout";
import { Button } from "@/components/ui/button";
import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { SHOWCASE_PROJECTS } from "@/constants/showcase";
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

  return createMetadata({
    canonical: withLocalePrefix(lang, ROUTES.SHOWCASE),
    description: translation.showcasePage.description,
    title: translation.showcasePage.heading,
  });
};

const ShowcasePage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const translation = getTranslation(lang);

  return (
    <>
      <SectionContainer className="flex flex-1 flex-col">
        <SectionContent className="w-full flex-1">
          <div className="border-fd-border flex flex-col items-center border-b px-6 py-16 text-center">
            <h1 className="font-pixel text-fd-foreground mb-2 text-3xl font-bold sm:text-4xl">
              {translation.showcasePage.heading}
            </h1>
            <p className="text-fd-muted-foreground mb-6">
              {translation.showcasePage.description}
            </p>
            <Button asChild>
              <a
                href={`${LINK.GITHUB}/issues/new?title=Showcase+submission&body=Project+name:%0AProject+URL:`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlusIcon />
                {translation.showcasePage.suggestYours}
              </a>
            </Button>
          </div>

          {SHOWCASE_PROJECTS.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {SHOWCASE_PROJECTS.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-fd-border text-fd-foreground hover:bg-fd-accent/20 flex items-center border-r border-b px-6 py-5 text-sm font-medium transition-colors"
                >
                  {project.name}
                </a>
              ))}
            </div>
          ) : (
            <div className="text-fd-muted-foreground flex flex-1 flex-col items-center gap-2 px-6 py-24 text-center">
              <p className="text-sm">{translation.showcasePage.empty}</p>
            </div>
          )}
        </SectionContent>
      </SectionContainer>
      <Footer translation={translation} />
    </>
  );
};

export default ShowcasePage;
