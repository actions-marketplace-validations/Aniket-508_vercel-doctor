import { describe, expect, it } from "vitest";

import { shouldSelectAllChoices } from "../src/utils/should-select-all-choices.js";

describe(shouldSelectAllChoices, () => {
  it("returns true when no enabled choice is selected", () => {
    const shouldSelectAllEnabledChoices = shouldSelectAllChoices([
      { selected: false },
      { selected: false },
    ]);

    expect(shouldSelectAllEnabledChoices).toBeTruthy();
  });

  it("returns true when some enabled choices are selected", () => {
    const shouldSelectAllEnabledChoices = shouldSelectAllChoices([
      { selected: true },
      { selected: false },
      { selected: false },
    ]);

    expect(shouldSelectAllEnabledChoices).toBeTruthy();
  });

  it("returns false when all enabled choices are selected", () => {
    const shouldSelectAllEnabledChoices = shouldSelectAllChoices([
      { selected: true },
      { selected: true },
      { selected: true },
    ]);

    expect(shouldSelectAllEnabledChoices).toBeFalsy();
  });

  it("ignores disabled choices when checking if all are selected", () => {
    const shouldSelectAllEnabledChoices = shouldSelectAllChoices([
      { selected: true },
      { disabled: true, selected: false },
      { selected: true },
    ]);

    expect(shouldSelectAllEnabledChoices).toBeFalsy();
  });
});
