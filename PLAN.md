# Plan: Restaurant Bucket List + "Where tonight?" randomiser

## Goal

Practise React concepts by building a fun app I'd actually use. Usability is a bonus, not the target.

## Stack

- Vite+ with React 19 and TypeScript
- CSS Modules (`*.module.css`) plus `index.css` for CSS variables; no UI kit or Tailwind
- Modals: native `<dialog>` opened with invoker commands (`command="show-modal"`, `commandfor`)
- State: `useReducer` in `RestaurantProvider`, shared through Context, persisted to localStorage
- Filter and search written by hand as pure functions
- Tests: Vitest (`vp test`) for pure helpers
- Maps: Leaflet + `react-leaflet` with OpenStreetMap tiles
- Geocoding: Nominatim (address search and reverse geocoding). No API keys needed
- Icons: `lucide-react`; toasts: `react-toastify`

Changed from the original plan: Leaflet/OSM replaced Google Maps, and address search replaced click-to-place.

## Data model

```ts
type PriceRangeType = "$" | "$$" | "$$$" | "$$$$";
type VisitStatusType = "Visited" | "Want to Eat" | null;
type LatLong = [lat: number, lng: number];

interface RestaurantType {
  id: string;
  name: string;
  cuisine?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  price?: PriceRangeType;
  visits?: number; // 0 = want to eat, > 0 = visited
  comments?: string;
  address?: string;
  latLong?: LatLong;
  addedAt?: string; // YYYY-MM-DD
  lastVisitedAt?: string;
  isFavourited: boolean;
  favouritedAt?: string; // ISO timestamp
}

interface ConstraintType {
  distance: string | null; // "1 km" | "3 km" | "5 km" | "10 km"
  price: PriceRangeType | null; // upper limit
  scope: VisitStatusType;
  location: { lat: number; lon: number; suburb: string } | null; // session only
}
```

Rules:

- Visit status is derived from `visits`, never stored.
- A restaurant can exist without coordinates (no map pin).

## Folder structure

```
src/
  components/layout/  page sections: Navbar, MainContent, TableContainer, RandomiserContainer, map containers
  components/ui/      reusable pieces: Button, Modal, Card, Table, forms, randomiser modal and loader
  components/Map/     the Leaflet map
  context/            restaurant list, selected restaurant, map selection
  store/              restaurant reducer
  utils/              types, constants, pure helpers (with tests), hooks
```

## Features

### Restaurant list

- [x] Add a restaurant (form in a modal)
- [x] Edit a restaurant (same form)
- [x] Delete with a confirm dialog
- [x] Persist to localStorage, seeded with sample data
- [x] Favourites (bookmark) sorted to the top
- [x] Filters: visit status, cuisine, price, rating
- [x] Search by name (`useDeferredValue`)
- [x] Empty state ("No Restaurants")
- [x] Visit counter (+/-)
- [x] Table on desktop, card list on mobile
- [ ] Sortable columns
- [ ] Visit counter: stop at 0 and set `lastVisitedAt` to today on +

### Map

- [x] Map beside the table on desktop, slide-out drawer on mobile
- [x] Row/card map button flies to that restaurant's pin
- [x] "No map pin saved" message for restaurants without coordinates
- [x] Set a pin from an address search in the form
- [ ] Pins for every filtered restaurant
- [ ] Click a pin to select and scroll to its row
- [ ] Fit the map to the filtered pins when filters change

### Randomiser

- [x] "Pick a Restaurant" button with optional constraints
- [x] "Get your location" via `navigator.geolocation` + Nominatim suburb lookup, toast on failure
- [x] Max distance (1 / 3 / 5 / 10 km), price limit, wishlist scope
- [x] Result modal: details, map pin, Google Maps link
- [x] "No match" state listing the active constraints
- [x] Slot-machine loader cycling candidate names
- [ ] Move the filter logic into a pure `buildPool(restaurants, constraints)` with tests
- [ ] "Pick again" button in the result modal
- [ ] Start from the table's filtered list instead of every restaurant
- [ ] Loader lands on the chosen winner; skip it when only one restaurant matches
- [ ] Click the map to set your location when geolocation fails

### Delivery

- [x] README
- [ ] GIF in the README
- [ ] Deploy
- [ ] Accessibility pass (e.g. the location pill is a clickable `<div>`, not a button)

## React concepts map

| Concept                   | Where                                                      | Done |
| ------------------------- | ---------------------------------------------------------- | ---- |
| `useReducer`              | Restaurant list in `RestaurantProvider`                    | Yes  |
| Context                   | Restaurants, selected restaurant, map selection            | Yes  |
| Custom hooks              | `useGetRandomRestaurant`, `useMediaQuery`                  | Yes  |
| `useActionState`          | Address search in `AddressInput`                           | Yes  |
| `useId`                   | Delete confirm dialog id                                   | Yes  |
| `useMemo` / `memo`        | Map actions context value; `Table` and `MobileList`        | Yes  |
| `useDeferredValue`        | Table filters and search                                   | Yes  |
| `useRef`                  | Dialogs, outside-click on the address dropdown             | Yes  |
| `useEffect` + cleanup     | Loader timers, map fly-to, dropdown outside-click listener | Yes  |
| `React.lazy` + `Suspense` | Map in its own bundle with a loading fallback              | No   |
| Error boundary            | Wrap the map so a failure shows a fallback, not a crash    | No   |

## Next steps

1. Extract `buildPool` with tests, then add "Pick again"
2. Fix the visit counter (floor at 0, set `lastVisitedAt`)
3. Clear the randomiser's 3s loading timeout on unmount
4. Move the `createContext` calls into their own files to clear the 4 fast-refresh lint warnings
5. Map pins for all filtered restaurants, then `fitBounds`
6. Lazy-load the map with an error boundary
7. README GIF, deploy, accessibility pass

`useLocalStorage` is unused (the provider writes localStorage directly). Use it or delete it.

## Known gotchas

- **Map height:** the map's container needs an explicit height or nothing shows. Callers override it with a descendant selector (e.g. `.modalContent .map`).
- **Leaflet in dialogs:** Leaflet measures its size on mount, so only mount a map once its dialog is open.
- **Leaflet marker icons:** use a custom `Icon` with Vite's bundled image URLs; the default icon breaks.
- **Nominatim:** a free public service with a usage policy; keep requests user-triggered, not on every keystroke.
- **Geolocation:** inaccurate on laptops and can be denied.

## Out of scope

- Group mode
- Backend (Node + Postgres)
- Visit log with history (replaced by the visit counter)
- Weighting, cooldown, pick history, Accept/Veto
- Mobile map/list view toggle
