import { useCallback, useSyncExternalStore } from "react";

/** Whether a CSS media query currently matches, updating when it changes. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = matchMedia(query);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => matchMedia(query).matches);
}
