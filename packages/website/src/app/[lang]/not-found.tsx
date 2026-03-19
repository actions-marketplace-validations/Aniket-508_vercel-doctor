"use client";

import { useParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { withLocalePrefix } from "@/i18n/navigation";
import { getTranslation } from "@/translations";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpenIcon, HomeIcon } from "lucide-react";

const NotFoundPage = () => {
  const { lang } = useParams<{ lang: string }>();
  const translation = getTranslation(lang);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle className="font-black font-mono text-8xl">
          {translation.notFound.heading}
        </EmptyTitle>
        <EmptyDescription className="text-nowrap">
          {translation.notFound.description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/">
              <HomeIcon />
              {translation.notFound.goHome}
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href={withLocalePrefix(lang, ROUTES.DOCS)}>
              <BookOpenIcon />
              {translation.notFound.explore}
            </Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default NotFoundPage;
