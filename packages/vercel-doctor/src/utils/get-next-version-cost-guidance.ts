import { NEXT_MAJOR_VERSION_15, NEXT_MAJOR_VERSION_16 } from "../constants.js";
import type { ProjectInfo } from "../types.js";

export const getNextVersionCostGuidance = (projectInfo: ProjectInfo): string[] => {
  if (projectInfo.framework !== "nextjs") return [];

  if (
    projectInfo.nextMajorVersion !== null &&
    projectInfo.nextMajorVersion >= NEXT_MAJOR_VERSION_16
  ) {
    return [
      `Next.js ${NEXT_MAJOR_VERSION_16}+ detected: prefer "use cache" with cache tags for shared reads to cut uncached function work.`,
      "Keep Proxy usage narrow with strict matcher patterns so every request is not billed dynamic compute.",
    ];
  }

  if (projectInfo.nextMajorVersion === NEXT_MAJOR_VERSION_15) {
    return [
      `Next.js ${NEXT_MAJOR_VERSION_15} detected: fetch and GET handlers are uncached by default, so explicitly add cache policies.`,
      "Prioritize cacheable fetches with revalidate windows before introducing force-dynamic rendering.",
    ];
  }

  if (projectInfo.nextMajorVersion !== null) {
    return [
      "Older Next.js version detected: verify force-dynamic and no-store are only used for truly request-specific data.",
    ];
  }

  return [
    "Next.js detected but version was not parsed. Set an explicit next semver range to unlock version-aware cost guidance.",
  ];
};
