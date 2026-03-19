"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { withLocalePrefix } from "@/i18n/navigation";
import type { Translation } from "@/translations";

const COPY_FEEDBACK_DURATION_MS = 2000;

interface BadgeSnippetProps {
  searchParamsString: string;
  lang: string;
  translation: Translation;
}

const BadgeSnippet = ({
  searchParamsString,
  lang,
  translation,
}: BadgeSnippetProps) => {
  const [didCopy, setDidCopy] = useState(false);

  const sharePath = withLocalePrefix(lang, ROUTES.SHARE);
  const badgePath = "/share/badge";
  const badgeFullUrl = `${SITE.URL}${badgePath}?${searchParamsString}`;
  const shareFullUrl = `${SITE.URL}${sharePath}?${searchParamsString}`;
  const badgePreviewPath = `${badgePath}?${searchParamsString}`;
  const markdownSnippet = `[![Vercel Doctor](${badgeFullUrl})](${shareFullUrl})`;

  const resetCopy = useCallback(() => setDidCopy(false), []);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdownSnippet);
      setDidCopy(true);
      setTimeout(resetCopy, COPY_FEEDBACK_DURATION_MS);
    } catch {
      // Clipboard may be unavailable
    }
  }, [markdownSnippet, resetCopy]);

  return (
    <div className="space-y-3">
      <p className="text-fd-muted-foreground">
        {translation.share.addBadgeToReadme}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={badgePreviewPath}
          alt="Vercel Doctor score badge"
          height={20}
          className="block"
        />
        <a
          href={badgePreviewPath}
          target="_blank"
          rel="noreferrer"
          className="text-fd-muted-foreground hover:text-fd-foreground text-xs underline underline-offset-2 transition-colors"
        >
          {translation.share.openSvg}
        </a>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <code className="border-fd-border bg-fd-muted/50 text-fd-foreground flex min-w-0 flex-1 items-center rounded-md border px-3 py-1.75 text-xs break-all">
          {markdownSnippet}
        </code>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="shrink-0"
        >
          {didCopy ? translation.share.copied : translation.share.copy}
        </Button>
      </div>
    </div>
  );
};

export default BadgeSnippet;
