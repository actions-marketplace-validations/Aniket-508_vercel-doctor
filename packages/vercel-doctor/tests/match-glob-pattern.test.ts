import { describe, expect, it } from "vitest";

import { matchGlobPattern } from "../src/utils/match-glob-pattern.js";

describe(matchGlobPattern, () => {
  it("matches exact file paths", () => {
    expect(matchGlobPattern("src/app.tsx", "src/app.tsx")).toBeTruthy();
    expect(matchGlobPattern("src/app.tsx", "src/other.tsx")).toBeFalsy();
  });

  it("matches single wildcard for filenames", () => {
    expect(matchGlobPattern("src/app.tsx", "src/*.tsx")).toBeTruthy();
    expect(matchGlobPattern("src/utils.ts", "src/*.tsx")).toBeFalsy();
    expect(matchGlobPattern("src/nested/app.tsx", "src/*.tsx")).toBeFalsy();
  });

  it("matches double wildcard at the end", () => {
    expect(
      matchGlobPattern("src/generated/foo.tsx", "src/generated/**"),
    ).toBeTruthy();
    expect(
      matchGlobPattern("src/generated/bar/baz.tsx", "src/generated/**"),
    ).toBeTruthy();
    expect(
      matchGlobPattern("src/other/foo.tsx", "src/generated/**"),
    ).toBeFalsy();
  });

  it("matches double wildcard with trailing slash and filename", () => {
    expect(matchGlobPattern("src/foo/test.ts", "src/**/test.ts")).toBeTruthy();
    expect(
      matchGlobPattern("src/foo/bar/test.ts", "src/**/test.ts"),
    ).toBeTruthy();
    expect(matchGlobPattern("src/test.ts", "src/**/test.ts")).toBeTruthy();
  });

  it("matches double wildcard at the start", () => {
    expect(
      matchGlobPattern("src/components/Button.tsx", "**/*.tsx"),
    ).toBeTruthy();
    expect(matchGlobPattern("Button.tsx", "**/*.tsx")).toBeTruthy();
    expect(
      matchGlobPattern("deep/nested/path/file.tsx", "**/*.tsx"),
    ).toBeTruthy();
    expect(matchGlobPattern("file.ts", "**/*.tsx")).toBeFalsy();
  });

  it("matches question mark as single character", () => {
    expect(matchGlobPattern("src/a.tsx", "src/?.tsx")).toBeTruthy();
    expect(matchGlobPattern("src/ab.tsx", "src/?.tsx")).toBeFalsy();
  });

  it("escapes regex special characters in patterns", () => {
    expect(
      matchGlobPattern("src/file.test.tsx", "src/*.test.tsx"),
    ).toBeTruthy();
    expect(matchGlobPattern("src/filetesttsx", "src/*.test.tsx")).toBeFalsy();
  });

  it("normalizes backslashes to forward slashes", () => {
    expect(
      matchGlobPattern("src\\generated\\foo.tsx", "src/generated/**"),
    ).toBeTruthy();
  });
});
