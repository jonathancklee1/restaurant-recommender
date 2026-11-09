const STATE_AND_POSTCODE = /\s+(NSW|VIC|QLD|SA|WA|TAS|ACT|NT)(\s+\d{4})?\s*$/i;

/** Suburb from an address like "1 Dixon St, Haymarket NSW 2000" -> "Haymarket". */
export const getSuburb = (address = "") => {
  const lastPart = address.split(",").at(-1) ?? "";
  return lastPart.replace(STATE_AND_POSTCODE, "").trim();
};
