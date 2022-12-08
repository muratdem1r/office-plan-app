import { useRef } from "react";

// Custom Hooks
import useCreateMap from "map/hooks/useCreateMap";
import useMapEvents from "map/hooks/useMapEvents";

import styles from "./MapWrapper.module.css";

function MapWrapper() {
  const mapRef = useRef();

  useCreateMap(mapRef);
  useMapEvents();

  return <div ref={mapRef} className={styles.map}></div>;
}

export default MapWrapper;
