# Plan: Restaurant Bucket List + "Where tonight?" randomiser

## Goal

Practise React concepts by building a fun app I'd actually use. Usability is a bonus, not the target. Timeline: about 11 working days.

## Stack

- Vite+ with React 19 and TypeScript
- CSS Modules (`*.module.css`) plus one global file for CSS variables (colours, spacing); no UI kit or Tailwind
- Modal: native `<dialog>` with `showModal()`, controlled via a ref
- State: `useState` first, refactor to `useReducer` once the form and table both need it
- Sort, filter and search written by hand as pure functions (no TanStack Table)
- Tests: Vitest + React Testing Library (`vp test`) for pure logic, plus one or two component tests
- Storage: localStorage through a custom `useLocalStorage` hook
- Maps: `@vis.gl/react-google-maps` (`APIProvider`, `Map`, `AdvancedMarker`, `InfoWindow`, `useMap`)
- Env: `VITE_GOOGLE_MAPS_KEY` and `VITE_GOOGLE_MAP_ID` in `.env.local`

## Data model

```ts
type Price = 1 | 2 | 3 | 4;
type Status = "want" | "visited";

type Place = {
  id: string; // crypto.randomUUID()
  name: string;
  cuisine: string;
  suburb: string;
  price: Price;
  visitCount: number; // 0 = want, > 0 = visited
  rating?: number; // 1-5
  notes?: string;
  lat?: number;
  lng?: number;
  addedAt: string; // YYYY-MM-DD
  lastVisitedAt?: string; // YYYY-MM-DD, set to today on +
};

type RandomiserSettings = {
  maxDistanceKm: 1 | 3 | 5 | 10; // default 3
  maxPrice: Price;
  statuses: Status[];
};

type Origin = { lat: number; lng: number }; // session only, not persisted
```

Rules:

- Status is derived, never stored: `statusOf(place)` returns `"want"` when `visitCount === 0`, otherwise `"visited"`.
- The visit counter never goes below 0. Pressing + sets `lastVisitedAt` to today; pressing - leaves it alone.
- A place can exist without coordinates ("no location yet").

## Features

### Table

1. Add a place (form)
2. Edit a place (modal, same form)
3. Delete a place
4. Persist to localStorage
5. Sortable columns
6. Filter chips: cuisine, suburb, status
7. Search
8. Empty states (no places yet, no matches)
9. Per-row "Open in Maps" and "Directions" links (URL only)
10. "No pin" badge for places without coordinates
11. Visit counter (+/-) per row

### Map

12. Map panel beside the table with pins for filtered places that have coordinates
13. Click a pin: highlight its row and scroll it into view
14. Click a row: pan to its pin and open its InfoWindow. No pin: leave the map and show "No location yet - edit to add a pin"
15. `fitBounds` on the filtered pins when the filters change
16. Click-to-place a pin on a small map in the add/edit form

### Randomiser

17. Origin: "Use my location" button (`navigator.geolocation`); if it fails or is denied, click the map to set your spot
18. Distance chips: 1 / 3 / 5 / 10 km, default 3 km. Places without coordinates are excluded
19. Price and status filters, starting from the table's current filtered list
20. Result card (name, cuisine, price, Directions link), map pans to the winner, "Pick again" button
21. Empty state: "Nothing nearby matches - try a wider distance"
22. Slot-machine animation that lands on the already-chosen winner (build last, cut first)

### Delivery

23. README with a GIF
24. Deploy (add the deploy URL to the API key's referrer list)
25. Accessibility pass

## Randomiser design

- **Decide first, animate after.** A pure function picks the winner immediately. The animation only displays it.
- Pure functions, all tested:
  - `haversineKm(a, b)`
  - `buildPool(places, settings, origin)` - status, price, distance; drops places without coordinates
  - `pickRandom(pool, rng = Math.random)` - `rng` is injected so tests can fix it
- `useRandomiser` hook with `useReducer`: `idle -> spinning -> revealed`, plus `empty`
- A pool of 1 skips the animation
- Animation: `setInterval` cycling names for about 1.5s, cleared in the effect cleanup
- Components: `RandomiserPanel`, `ResultCard`. `selectedId` lives in the common parent

## React concepts map

| Concept                          | Where                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `useState` -> `useReducer`       | Places state once form and table both change it                                 |
| Custom hooks                     | `useLocalStorage`, `useRandomiser`                                              |
| `useActionState` + form `action` | Add/edit form: submit, validation errors, pending state                         |
| `useId`                          | Form labels                                                                     |
| `useMemo`                        | Filtered and sorted list                                                        |
| `useDeferredValue`               | Search input                                                                    |
| `useRef`                         | Scrolling the selected row into view; opening/closing the edit `<dialog>`       |
| `useEffect` + cleanup            | Animation interval, syncing the map to `selectedId`                             |
| Lifting state                    | `selectedId` shared by table, map and result card                               |
| Context                          | Move `selectedId` into Context only once prop drilling hurts                    |
| `React.lazy` + `Suspense`        | Map panel in its own bundle with a loading fallback                             |
| Error boundary                   | Wraps the map so a bad key or missing Map ID shows a fallback, not a crash      |
| Controlled vs uncontrolled       | Filter chips and search (controlled), form fields (uncontrolled via `FormData`) |

## Folder structure

```
src/
  places/      Place type, table, form, edit modal, sort/filter/search
  map/         every Google Maps import lives here
  randomiser/  pure functions, useRandomiser, RandomiserPanel, ResultCard
  lib/         useLocalStorage, date helpers
```

## Schedule

| Day | Work                                                                                                          | Done when                                                       |
| --- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 0   | Google Cloud: project, billing, Maps JavaScript API, restricted key, Map ID, budget alert                     | A test `<Map>` renders tiles (not grey) on localhost            |
| 1-3 | Place type, table, add form (`useActionState`, `useId`), delete, edit modal, `useLocalStorage`, visit counter | Can add, edit, delete and count visits; data survives a refresh |
| 4   | Sort, filter, search as pure functions with tests; `useDeferredValue`; Maps links                             | `vp test` passes; table sorts, filters and searches             |
| 5   | Lazy map panel with error boundary; pins for filtered places; `fitBounds`                                     | Pins match the filtered table                                   |
| 6   | Two-way selection (pin <-> row), "No pin" badge and hint                                                      | Clicking either side selects the other, no effect loops         |
| 7   | Click-to-place in the form                                                                                    | A new place can get a pin                                       |
| 8   | `haversineKm`, `buildPool`, `pickRandom` with tests (no UI)                                                   | Tests pass with a fixed `rng`                                   |
| 9   | Location button, map-click origin, distance chips, `RandomiserPanel`, `ResultCard`, map pan                   | Instant pick works end to end                                   |
| 10  | Slot-machine animation; buffer for map overruns                                                               | Animation lands on the chosen winner and cleans up on unmount   |
| 11  | README with GIF, deploy, referrer update, accessibility pass                                                  | Live URL with a working map                                     |

**If behind:** cut the animation first, then click-to-place (enter coordinates by hand instead), then `fitBounds`.

## Known gotchas

- **Grey map:** missing Map ID, wrong key restrictions or billing off. The error boundary will not catch this because it does not throw - check by eye.
- **Map height:** the map's parent needs an explicit height or nothing shows.
- **Effect loops:** row click pans the map, which must not re-trigger selection. Only sync map -> state on user events, not on camera changes.
- **Markers:** key by `place.id`; memoise the filtered list.
- **`FormData` values are strings:** convert price, rating, lat and lng before building a `Place`.
- **`React.lazy` needs a default export:** `MapPanel.tsx` must `export default`.
- **Geolocation:** inaccurate on laptops and can be denied; the map-click fallback covers both.
- **Order:** don't build the map before the table works; don't build the animation before the pick logic works.

## Out of scope

- Group mode
- Backend (Node + Postgres)
- Visit log with history (replaced by the visit counter)
- Weighting, cooldown, pick history, Accept/Veto
- Places Autocomplete
- Mobile map/list view toggle
