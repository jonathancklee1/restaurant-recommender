import { describe, expect, test } from "vite-plus/test";
import { getGoogleMapsUrl } from "./getGoogleMapsUrl";

describe("getGoogleMapsUrl", () => {
  test("builds a Maps search link", () => {
    expect(getGoogleMapsUrl("Nonna Rosa")).toBe(
      "https://www.google.com/maps/search/?api=1&query=Nonna%20Rosa",
    );
  });

  test("encodes characters that would break the query", () => {
    expect(getGoogleMapsUrl("Ember & Salt, Barangaroo")).toBe(
      "https://www.google.com/maps/search/?api=1&query=Ember%20%26%20Salt%2C%20Barangaroo",
    );
  });
});
