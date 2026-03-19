"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { withLocalePrefix } from "@/i18n/navigation";
import type { Translation } from "@/translations";

import {
  SectionContainer,
  SectionContent,
  SectionFiller,
  SectionHelper,
} from "./section-layout";

interface PreFooterProps {
  translation: Translation;
  lang: string;
}

const useDynamicDate = () => {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString().slice(-2);
  return `${month}/${year}`;
};

export const PreFooter = ({ translation, lang }: PreFooterProps) => {
  const dynamicDate = useDynamicDate();

  return (
    <>
      <SectionFiller className="max-md:border-t-0" />
      <SectionContainer>
        <SectionHelper className="border-b">
          {translation.preFooter.sectionLabel}
        </SectionHelper>
        <SectionContent className="from-fd-muted/40 to-fd-muted/80 dark:from-fd-muted/20 dark:to-fd-muted/40 flex flex-col items-center gap-8 overflow-hidden bg-linear-to-b px-4 py-24 text-center md:px-12">
          <h2 className="font-pixel text-fd-foreground text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            {translation.preFooter.heading} <br />
            {translation.preFooter.by} {dynamicDate}
            <span className="animate-[pulse-dot_1s_steps(1)_infinite]">.</span>
          </h2>

          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href={withLocalePrefix(lang, ROUTES.DOCS)}>
                {translation.preFooter.getStarted}
                <ArrowRightIcon />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={LINK.GITHUB} target="_blank" rel="noopener noreferrer">
                <GithubIcon />
                {translation.preFooter.viewOnGithub}
              </a>
            </Button>
          </div>
        </SectionContent>
      </SectionContainer>
    </>
  );
};
