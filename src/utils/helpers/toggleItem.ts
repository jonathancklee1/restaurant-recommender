/** Returns a new list with the item removed if present, or added if missing. */
export const toggleItem = <T>(list: T[], item: T) =>
  list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
