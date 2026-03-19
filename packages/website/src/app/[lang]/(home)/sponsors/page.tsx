import { HeartHandshakeIcon } from "lucide-react";
import Image from "next/image";

import { Footer } from "@/components/landing/footer";
import {
  SectionContainer,
  SectionContent,
} from "@/components/landing/section-layout";
import { Button } from "@/components/ui/button";
import { LINK } from "@/constants/links";
import { SPONSORS } from "@/constants/sponsors";
import type { Sponsor } from "@/constants/sponsors";
import { i18n } from "@/i18n/config";
import { getTranslation } from "@/translations";

export const generateStaticParams = () =>
  i18n.languages.map((lang) => ({ lang }));

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => (
  <a
    href={sponsor.url}
    target="_blank"
    rel="noopener noreferrer"
    className="border-fd-border hover:bg-fd-accent/20 flex items-center gap-3 border-r border-b px-6 py-5 transition-colors"
  >
    <Image
      src={sponsor.logoUrl}
      alt={sponsor.name}
      width={96}
      height={24}
      className="h-6 w-auto object-contain"
    />
    <span className="text-fd-foreground text-sm font-medium">
      {sponsor.name}
    </span>
  </a>
);

const EmptyCell = () => (
  <a
    href={LINK.SPONSOR}
    target="_blank"
    rel="noopener noreferrer"
    className="border-fd-border text-fd-muted-foreground/40 hover:bg-fd-accent/10 hover:text-fd-muted-foreground flex items-center justify-center border-r border-b px-6 py-5 transition-colors"
  >
    <span className="text-2xl font-light">+</span>
  </a>
);

const SponsorsPage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const translation = getTranslation(lang);
  const activeSponsors = SPONSORS.filter(Boolean) as Sponsor[];

  return (
    <>
      <SectionContainer className="flex flex-1 flex-col">
        <SectionContent className="w-full flex-1">
          <div className="border-fd-border flex flex-col items-center border-b px-6 py-16 text-center">
            <h1 className="font-pixel text-fd-foreground mb-2 text-3xl font-bold sm:text-4xl">
              {translation.sponsorsPage.heading}
            </h1>
            <p className="text-fd-muted-foreground mb-6">
              {translation.sponsorsPage.description}
            </p>
            <Button asChild>
              <a href={LINK.SPONSOR} target="_blank" rel="noopener noreferrer">
                <HeartHandshakeIcon />
                {translation.sponsorsPage.sponsorMyWork}
              </a>
            </Button>
          </div>

          {activeSponsors.length > 0 && (
            <>
              <div className="border-fd-border border-b px-6 py-3">
                <p className="text-fd-muted-foreground text-xs font-medium tracking-widest uppercase">
                  {translation.sponsorsPage.organizationSponsors}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {activeSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.name} sponsor={sponsor} />
                ))}
                <EmptyCell />
              </div>
            </>
          )}

          {activeSponsors.length === 0 && (
            <div className="text-fd-muted-foreground flex flex-col items-center gap-2 px-6 py-24 text-center">
              <p className="text-sm">{translation.sponsorsPage.empty}</p>
            </div>
          )}
        </SectionContent>
      </SectionContainer>
      <Footer translation={translation} />
    </>
  );
};

export default SponsorsPage;
