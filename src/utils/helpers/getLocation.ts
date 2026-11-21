/** Resolves the browser's current position. */
function getCurrentPosition() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });
}

/** Gets the user's coordinates and reverse-geocodes them to a suburb via Nominatim. */
export async function getLocation() {
  const { coords } = await getCurrentPosition();
  const { latitude: lat, longitude: lon } = coords;

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Reverse geocoding failed: ${res.status}`);

  const data = await res.json();
  const addr = data.address ?? {};
  return {
    lat,
    lon,
    suburb: addr.suburb ?? addr.town ?? addr.city_district ?? addr.village ?? null,
  };
}
