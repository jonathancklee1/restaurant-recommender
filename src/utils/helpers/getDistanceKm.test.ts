import { describe, expect, test } from "vite-plus/test";
import { getDistanceKm } from "./getDistanceKm";

describe("getDistanceKm", () => {
  test("is zero for the same point", () => {
    expect(getDistanceKm([-33.8688, 151.2093], [-33.8688, 151.2093])).toBe(0);
  });

  test("measures Sydney CBD to Bondi Beach", () => {
    expect(getDistanceKm([-33.8688, 151.2093], [-33.8908, 151.2743])).toBeCloseTo(6.48, 1);
  });

  test("measures one degree of latitude as about 111 km", () => {
    expect(getDistanceKm([0, 0], [1, 0])).toBeCloseTo(111.19, 1);
  });
});
