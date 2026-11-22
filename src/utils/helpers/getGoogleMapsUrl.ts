/** Google Maps search link (Maps URLs API). Include the place name so it finds the actual place. */
export const getGoogleMapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
