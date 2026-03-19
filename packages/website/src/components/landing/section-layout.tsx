import { cn } from "@/lib/utils";

export const SectionContainer = ({
  children,
  className,
}: React.ComponentProps<"section">) => (
  <section className={cn("relative w-full md:px-12", className)}>
    {children}
  </section>
);

export const SectionContent = ({
  children,
  className,
}: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "border-fd-border mx-auto max-w-(--fd-layout-width) border-x border-t max-md:border-x-0",
      className,
    )}
  >
    {children}
  </div>
);

export const SectionHelper = ({
  children,
  className,
}: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "border-fd-border mx-auto -my-px max-w-(--fd-layout-width) border-x border-t px-4 max-md:border-x-0 md:px-12",
      className,
    )}
  >
    <div className="text-fd-muted-foreground flex items-center justify-between py-4 font-mono text-xs font-medium tracking-wider md:py-6 md:text-sm">
      {children}
    </div>
  </div>
);

export const SectionFiller = ({ className }: React.ComponentProps<"div">) => (
  <div className="md:px-12">
    <SectionContent className={className}>
      <div className="h-24 w-full md:h-28 lg:h-32" />
    </SectionContent>
  </div>
);
