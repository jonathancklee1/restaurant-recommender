# Restaurant Recommender

A restaurant bucket list with a "where tonight?" randomiser. Keep track of places you want to try and places you've been, see them on a map, and let the app pick where to eat.

## Features

### Restaurant list

- Add, edit and delete restaurants with name, cuisine, address, price ($ to $$$$), rating (1-5) and comments
- Set a map pin by searching the address and picking a match
- Count visits with +/- buttons
- Bookmark favourites to keep them at the top of the list
- Search by name and filter by visit status, cuisine, price and rating
- Table on desktop, card list on mobile
- Saved in localStorage, seeded with sample restaurants on first load

### Map

- Show a restaurant's pin on the map beside the table (a slide-out drawer on mobile)

### Randomiser

- Pick a random restaurant with one click
- Optional constraints: max distance (1, 3, 5 or 10 km) from your current location, price limit, and wishlist scope (all, want to eat, visited)
- Slot-machine animation before the reveal
- Result shows the restaurant's details, its pin on a map and a Google Maps link, or a "no match" message listing the active constraints

## Stack

React 19, TypeScript, CSS Modules, Leaflet with OpenStreetMap tiles, and Nominatim for address search and reverse geocoding (no API keys needed). Built with [Vite+](https://viteplus.dev).

## Commands

- `vp install` - install dependencies
- `vp dev` - start the dev server
- `vp check` - format, lint and type check
- `vp test` - run tests
- `vp build` - production build
