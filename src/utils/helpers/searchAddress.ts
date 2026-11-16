import type { LatLong } from "../types";

export interface AddressResult {
  label: string;
  latLong: LatLong;
}

export async function searchAddress(query: string): Promise<AddressResult[]> {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.append("q", query);
    url.searchParams.append("format", "jsonv2");
    url.searchParams.append("limit", "5");
    url.searchParams.append("countrycodes", "au");

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Address search failed: ${response.status}`);
    const data: { display_name: string; lat: string; lon: string }[] = await response.json();
    return data.map((r) => ({ label: r.display_name, latLong: [Number(r.lat), Number(r.lon)] }));
  } catch (error) {
    console.error("Error searching address:", error);
    return [];
  }
}
