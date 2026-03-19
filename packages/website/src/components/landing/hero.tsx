"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SKILLS_COMMAND } from "@/constants/command";
import { LINK } from "@/constants/links";
import { PACKAGE_MANAGERS } from "@/constants/package-managers";
import { ROUTES } from "@/constants/routes";
import { withLocalePrefix } from "@/i18n/navigation";
import type { Translation } from "@/translations";

import { SectionContainer, SectionContent } from "./section-layout";

interface HeroProps {
  translation: Translation;
  lang: string;
}

const SkillsCommand = ({ translation }: { translation: Translation }) => {
  const [didCopy, setDidCopy] = useState(false);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(SKILLS_COMMAND);
    setDidCopy(true);
    setTimeout(() => setDidCopy(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copyCommand}
      className="border-fd-border bg-fd-muted/60 text-fd-muted-foreground hover:bg-fd-muted/80 hover:text-fd-foreground inline-flex cursor-copy items-center gap-2 rounded-full border-x px-4 py-1.5 font-mono text-xs transition-colors"
      aria-label={translation.hero.copyCommand}
    >
      {didCopy ? (
        <span className="text-green-600 dark:text-green-400">
          {translation.hero.copied}
        </span>
      ) : (
        <>
          <span className="text-fd-foreground">$</span>
          {SKILLS_COMMAND}
        </>
      )}
    </button>
  );
};

const DEFAULT_PACKAGE_MANAGER = "npm";

const CommandBlock = ({ translation }: { translation: Translation }) => {
  const [selectedPackageManager, setSelectedPackageManager] = useState(
    DEFAULT_PACKAGE_MANAGER,
  );
  const [didCopy, setDidCopy] = useState(false);

  const activeManager = PACKAGE_MANAGERS.find(
    (packageManager) => packageManager.id === selectedPackageManager,
  );

  const copyCommand = async () => {
    if (!activeManager) return;
    await navigator.clipboard.writeText(activeManager.command);
    setDidCopy(true);
    setTimeout(() => setDidCopy(false), 2000);
  };

  return (
    <div className="relative flex w-full max-w-md items-center p-px">
      <div className="bg-fd-muted z-10 flex w-full items-center justify-between gap-2 rounded-md py-1 pr-2 pl-4">
        <button
          type="button"
          onClick={copyCommand}
          className="flex min-w-0 cursor-copy items-center gap-2"
        >
          <p className="shrink-0 space-x-1 font-mono text-xs tracking-tighter select-none sm:text-sm">
            <span>
              <span className="text-sky-500">git:</span>
              <span className="text-red-400">(main)</span>
            </span>
            <span className="text-amber-600 italic">x</span>
          </p>
          <p className="text-fd-foreground relative inline truncate font-mono text-xs tracking-tight opacity-90 md:text-sm">
            {didCopy ? (
              <span className="text-green-600 dark:text-green-400">
                {translation.hero.copied}
              </span>
            ) : (
              activeManager?.command
            )}
          </p>
        </button>

        <Select
          value={selectedPackageManager}
          onValueChange={setSelectedPackageManager}
        >
          <SelectTrigger
            className="hover:bg-fd-foreground/5 h-7 w-auto gap-1 rounded-md border-none bg-transparent pr-1 pl-2 shadow-none"
            aria-label={translation.hero.selectPackageManager}
          >
            <span className="flex items-center">{activeManager?.icon}</span>
          </SelectTrigger>
          <SelectContent position="popper" align="end">
            {PACKAGE_MANAGERS.map((packageManager) => (
              <SelectItem key={packageManager.id} value={packageManager.id}>
                {packageManager.icon}
                {packageManager.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const Hero = ({ translation, lang }: HeroProps) => {
  return (
    <SectionContainer>
      <SectionContent className="flex flex-col gap-8 border-t-0 px-4 py-8 md:flex-row md:items-center md:gap-12 md:px-12 md:py-24">
        <div className="flex flex-col items-center gap-6 text-center md:w-1/2 md:items-start md:text-left">
          <SkillsCommand translation={translation} />

          <div className="space-y-2">
            <h1 className="font-pixel text-fd-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {translation.hero.headingLine1}
              <br />
              {translation.hero.headingLine2}
            </h1>

            <p className="text-fd-muted-foreground text-base sm:text-lg">
              {translation.hero.subtitle}
            </p>
          </div>

          <CommandBlock translation={translation} />

          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href={withLocalePrefix(lang, ROUTES.DOCS)}>
                {translation.hero.fixCosts}
                <ArrowRightIcon />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={LINK.GITHUB} target="_blank" rel="noopener noreferrer">
                <GithubIcon />
                {translation.hero.github}
              </a>
            </Button>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="border-fd-border bg-fd-muted/30 aspect-video w-full overflow-hidden border shadow-2xl">
            <video
              src={LINK.DEMO_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
            />
          </div>
        </div>
      </SectionContent>
    </SectionContainer>
  );
};
