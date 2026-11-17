import { useEffect } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { SYDNEY_CBD } from "../../utils/constants";
import { TriangleAlert } from "lucide-react";
import type { LatLong } from "../../utils/types";

// Leaflet's default icon prefixes a path guessed from CSS onto these URLs, which breaks
// with Vite's bundled image URLs, so the marker uses its own icon with the URLs as-is.
const markerIcon = new Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/** Zoom level used when showing a restaurant's pin. */
const PIN_ZOOM = 16;

interface MapProps {
  address: string | null;
  latLong: LatLong | null;
  className?: string;
}

function RecenterMap({ position }: { position: LatLong | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, PIN_ZOOM);
  }, [position, map]);
  return null;
}

export const Map = ({ address, latLong, className = "" }: MapProps) => {
  const error = address && !latLong ? "No map pin saved for this address" : null;

  return (
    <div className={`${styles.container} ${className}`}>
      {error && (
        <div className={styles.error}>
          <TriangleAlert />
          {error}
        </div>
      )}

      <MapContainer
        center={latLong ?? SYDNEY_CBD}
        zoom={latLong ? PIN_ZOOM : 13}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {latLong && (
          <Marker position={latLong} icon={markerIcon}>
            <Popup>{address}</Popup>
          </Marker>
        )}
        <RecenterMap position={latLong} />
      </MapContainer>
    </div>
  );
};

export default Map;
