import { Plus } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

import { LINK } from "@/constants/links";
import { SPONSORS } from "@/constants/sponsors";
import type { Sponsor } from "@/constants/sponsors";
import { i18n } from "@/i18n/config";
import { getTranslation } from "@/translations";

import { SectionContainer, SectionContent } from "./section-layout";

const GRID_SIZE = 16;

const SponsorDot = ({ className }: { className?: string }) => (
  <div
    className={`bg-fd-muted-foreground/30 absolute size-1.5 rounded-full ${className ?? ""}`}
  />
);

const SponsorCell = ({
  sponsor,
  isLastCell,
}: {
  sponsor: Sponsor | null;
  isLastCell: boolean;
}) => {
  if (isLastCell || !sponsor) {
    return (
      <a
        href={LINK.SPONSOR}
        target="_blank"
        rel="noopener noreferrer"
        className="border-fd-border hover:bg-fd-accent/20 relative flex aspect-[2.5/1] items-center justify-center border-r border-b transition-colors"
      >
        <SponsorDot className="-top-[3px] -left-[3px]" />
        <SponsorDot className="-top-[3px] -right-[3px]" />
        <SponsorDot className="-bottom-[3px] -left-[3px]" />
        <SponsorDot className="-right-[3px] -bottom-[3px]" />
        <Plus className="text-fd-muted-foreground size-5" />
      </a>
    );
  }

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-fd-border hover:bg-fd-accent/20 relative flex aspect-[2.5/1] items-center justify-center gap-3 border-r border-b px-4 transition-colors"
    >
      <SponsorDot className="-top-[3px] -left-[3px]" />
      <SponsorDot className="-top-[3px] -right-[3px]" />
      <SponsorDot className="-bottom-[3px] -left-[3px]" />
      <SponsorDot className="-right-[3px] -bottom-[3px]" />
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
};

interface SponsorsProps {
  lang?: (typeof i18n.languages)[number];
}

const STABLE_SLOT_IDS = Array.from(
  { length: GRID_SIZE },
  (_, i) => `sponsor-slot-${i}` as const,
);

export const Sponsors = ({ lang = i18n.defaultLanguage }: SponsorsProps) => {
  const translation = getTranslation(lang);
  const sponsorSlots = useMemo(
    () =>
      SPONSORS.slice(0, GRID_SIZE).map((sponsor, i) => ({
        key: sponsor?.url ?? sponsor?.name ?? STABLE_SLOT_IDS[i],
        sponsor,
      })),
    [],
  );

  return (
    <SectionContainer>
      <SectionContent>
        <div className="px-6 py-10 md:px-10">
          <h2 className="text-fd-foreground text-2xl font-bold">
            {translation.sponsorsSection.heading}
          </h2>
          <p className="text-fd-muted-foreground mt-2 text-sm">
            {translation.sponsorsSection.description}
          </p>
          <a
            href={LINK.SPONSOR}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fd-foreground hover:text-fd-muted-foreground mt-4 inline-block text-sm font-medium underline underline-offset-4 transition-colors"
          >
            {translation.sponsorsSection.sponsorMyWork}
          </a>
        </div>

        <div className="border-fd-border grid grid-cols-2 border-t sm:grid-cols-3 md:grid-cols-4">
          {sponsorSlots.map((slot, index) => (
            <SponsorCell
              key={slot.key}
              sponsor={slot.sponsor}
              isLastCell={index === GRID_SIZE - 1}
            />
          ))}
        </div>
      </SectionContent>
    </SectionContainer>
  );
};
