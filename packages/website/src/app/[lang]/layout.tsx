import { RootProvider } from "fumadocs-ui/provider/next";

import { isRtlLocale } from "@/i18n/config";
import { provider } from "@/i18n/ui";

const LangLayout = async ({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) => {
  const { lang } = await params;
  const isRtl = isRtlLocale(lang);

  return (
    <RootProvider i18n={provider(lang)} dir={isRtl ? "rtl" : "ltr"}>
      {children}
    </RootProvider>
  );
};

export default LangLayout;
