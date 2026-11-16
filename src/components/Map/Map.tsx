import { useEffect } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { SYDNEY_CBD } from "../../utils/constants";
import { TriangleAlert } from "lucide-react";
import type { LatLong } from "../../utils/types";

interface MapProps {
  address: string | null;
  latLong: LatLong | null;
  className?: string;
}

function RecenterMap({ position }: { position: LatLong | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 16);
  }, [position, map]);
  return null;
}

export const Map = ({ address, latLong, className = "" }: MapProps) => {
  const error = address && !latLong ? "Address not found" : null;

  return (
    <div className={`${styles.container} ${className}`}>
      {error && (
        <div className={styles.error}>
          <TriangleAlert />
          {error}
        </div>
      )}

      <MapContainer center={latLong ?? SYDNEY_CBD} zoom={13} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {latLong && (
          <Marker position={latLong}>
            <Popup>{address}</Popup>
          </Marker>
        )}
        <RecenterMap position={latLong} />
      </MapContainer>
    </div>
  );
};

export default Map;
