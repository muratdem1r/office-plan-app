import { useRef } from "react";

import styles from "./MapWrapper.module.css";

// Custom Hooks
import useCreateMap from "map/hooks/useCreateMap";
import useMapEvents from "map/hooks/useMapEvents";

function MapWrapper({ popup, popupRef }) {
  const mapRef = useRef();

  useCreateMap(mapRef);
  useMapEvents({ popup, popupRef });

  return <div ref={mapRef} className={styles.map}></div>;
}

export default MapWrapper;
