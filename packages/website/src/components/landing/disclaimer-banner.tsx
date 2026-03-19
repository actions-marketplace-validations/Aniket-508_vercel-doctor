import type { Translation } from "@/translations";

interface DisclaimerBannerProps {
  translation: Translation;
}

export const DisclaimerBanner = ({ translation }: DisclaimerBannerProps) => (
  <div className="border-fd-border bg-fd-muted/50 text-fd-muted-foreground w-full border-b py-2 text-center text-sm">
    {translation.disclaimer.text}{" "}
    <a
      href="https://vercel.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-fd-foreground font-medium underline underline-offset-4"
    >
      Vercel
    </a>
    .
  </div>
);
