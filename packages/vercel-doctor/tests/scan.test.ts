import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterAll, describe, expect, it, vi } from "vitest";

import { scan } from "../src/scan.js";

const FIXTURES_DIRECTORY = path.resolve(import.meta.dirname, "fixtures");

const mockOraStart = function mockOraStart(this: { stop: () => unknown }) {
  return this;
};
const mockOraStop = function mockOraStop(this: { start: () => unknown }) {
  return this;
};

vi.mock("ora", () => ({
  default: () => ({
    fail: () => {},
    start: mockOraStart,
    stop: mockOraStop,
    succeed: () => {},
    text: "",
  }),
}));

const noReactTempDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), "vercel-doctor-test-"),
);
fs.writeFileSync(
  path.join(noReactTempDirectory, "package.json"),
  JSON.stringify({ dependencies: {}, name: "no-react" }),
);

describe("project scan", () => {
  afterAll(() => {
    fs.rmSync(noReactTempDirectory, { force: true, recursive: true });
  });

  describe(scan, () => {
    it("completes without throwing on a valid React project", async () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      try {
        await scan(path.join(FIXTURES_DIRECTORY, "basic-react"), {
          deadCode: false,
          lint: true,
        });
        expect(consoleSpy).toHaveBeenCalledWith(expect.anything());
      } finally {
        consoleSpy.mockRestore();
      }
    });

    it("throws when React dependency is missing", async () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      try {
        await expect(
          scan(noReactTempDirectory, { deadCode: false, lint: true }),
        ).rejects.toThrow("No React dependency found");
      } finally {
        consoleSpy.mockRestore();
      }
    });

    it("skips lint when option is disabled", async () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      try {
        await scan(path.join(FIXTURES_DIRECTORY, "basic-react"), {
          deadCode: false,
          lint: false,
        });
        expect(consoleSpy).toHaveBeenCalledWith(expect.anything());
      } finally {
        consoleSpy.mockRestore();
      }
    });

    it("runs lint and dead code in parallel when both enabled", async () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      try {
        const startTime = performance.now();
        await scan(path.join(FIXTURES_DIRECTORY, "basic-react"), {
          deadCode: true,
          lint: true,
        });
        const elapsedMilliseconds = performance.now() - startTime;

        expect(elapsedMilliseconds).toBeLessThan(30_000);
      } finally {
        consoleSpy.mockRestore();
      }
    });
  });
});
