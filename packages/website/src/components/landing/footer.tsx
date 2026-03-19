import { XIcon, LlmsIcon } from "@/components/icons";
import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";
import type { Translation } from "@/translations";

interface FooterProps {
  translation: Translation;
}

export const Footer = ({ translation }: FooterProps) => (
  <footer className="border-fd-border mt-auto border-t">
    <div className="max-w-fd-container text-fd-muted-foreground mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row md:px-12">
      <p className="text-center sm:text-left">
        {translation.footer.builtBy}{" "}
        <a
          href={LINK.PORTFOLIO}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fd-foreground font-medium underline underline-offset-4"
        >
          {SITE.AUTHOR.NAME}
        </a>
        . {translation.footer.hostedOn}{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fd-foreground font-medium underline underline-offset-4"
        >
          Vercel
        </a>
        . {translation.footer.sourceAvailableOn}{" "}
        <a
          href={LINK.GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fd-foreground font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>

      <div className="flex items-center gap-4">
        <a
          href={LINK.TWITTER}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fd-foreground transition-colors"
          aria-label={translation.footer.twitter}
        >
          <XIcon className="size-4" />
        </a>
        <a
          href={LINK.LLMS}
          className="hover:text-fd-foreground transition-colors"
          aria-label={translation.footer.llms}
        >
          <LlmsIcon className="size-4" />
        </a>
      </div>
    </div>
  </footer>
);
