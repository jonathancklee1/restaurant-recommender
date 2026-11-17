import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { searchAddress } from "./searchAddress";

describe("searchAddress", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("maps results to labels and coordinates", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      Response.json([
        {
          display_name: "1 Dixon St",
          lat: "-33.86",
          lon: "151.30",
        },
      ]),
    );

    const results = await searchAddress("1 Dixon St");

    expect(results).toEqual([{ label: "1 Dixon St", latLong: [-33.86, 151.3] }]);

    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it("returns empty array if network error fails", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    const results = await searchAddress("1 Dixon St");
    expect(results).toEqual([]);
    expect(fetchSpy).toHaveBeenCalledOnce();
  });
  it("returns empty array if fetch fails", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 500 }));
    const results = await searchAddress("1 Dixon St");
    expect(results).toEqual([]);
    expect(fetchSpy).toHaveBeenCalledOnce();
  });
});
