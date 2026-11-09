import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";
import { SYDNEY_CBD } from "../../utils/constants";
interface MapProps {
  address: string | null;
  className?: string;
}
// Component to smoothly pan the map when coordinates change
function RecenterMap({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16);
    }
  }, [position, map]);
  return null;
}

export const Map = ({ address, className = "" }: MapProps) => {
  const [position, setPosition] = useState<LatLngExpression>(SYDNEY_CBD);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchCoordinates = async () => {
      setLoading(true);
      setError(null);
      try {
        // Query OpenStreetMap's completely free geocoding API \
        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.append("q", address);
        url.searchParams.append("format", "jsonv2");
        url.searchParams.append("limit", "1");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();

        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setPosition([lat, lon]);
        } else {
          setError("Address not found.");
        }
      } catch (err) {
        setError("Failed to look up address.");
      } finally {
        setLoading(false);
      }
    };

    void fetchCoordinates();
  }, [address]);

  return (
    <div className={`${styles.container} ${className}`}>
      {loading && <div className={styles.loadingContainer}>Locating...</div>}
      {error && <div className={styles.error}>{error}</div>}

      <MapContainer center={position} zoom={13} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{address}</Popup>
        </Marker>
        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
};

export default Map;
