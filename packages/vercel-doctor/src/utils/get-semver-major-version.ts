const SEMVER_MAJOR_VERSION_PATTERN = /(\d+)(?:\.\d+)?(?:\.\d+)?/;

export const getSemverMajorVersion = (versionRange: string | null | undefined): number | null => {
  if (!versionRange) return null;

  const matchedVersion = versionRange.match(SEMVER_MAJOR_VERSION_PATTERN);
  const majorVersionText = matchedVersion?.[1];
  if (!majorVersionText) return null;

  const parsedMajorVersion = Number.parseInt(majorVersionText, 10);
  if (Number.isNaN(parsedMajorVersion)) return null;

  return parsedMajorVersion;
};
