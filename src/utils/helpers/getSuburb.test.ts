import { describe, expect, test } from "vite-plus/test";
import { getSuburb } from "./getSuburb";

describe("getSuburb", () => {
  test("takes the suburb from a full address", () => {
    expect(getSuburb("1 Dixon St, Haymarket NSW 2000")).toBe("Haymarket");
  });

  test("handles a missing postcode", () => {
    expect(getSuburb("1 Dixon St, Haymarket NSW")).toBe("Haymarket");
  });

  test("keeps multi-word suburbs", () => {
    expect(getSuburb("88 Church St, Harris Park NSW 2150")).toBe("Harris Park");
  });

  test("returns a bare suburb unchanged", () => {
    expect(getSuburb("Newtown")).toBe("Newtown");
  });

  test("returns empty for no address", () => {
    expect(getSuburb()).toBe("");
  });
});
