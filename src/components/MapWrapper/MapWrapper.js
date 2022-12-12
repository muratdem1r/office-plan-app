import styles from "./MapWrapper.module.css";

// Custom Hooks
import useCreateMap from "map/hooks/useCreateMap";
import useDefaultPlans from "map/hooks/useDefaultPlans";

function MapWrapper({ popup, popupRef }) {
  const { mapRef } = useCreateMap({ popup, popupRef });
  useDefaultPlans();

  return <div ref={mapRef} className={styles.map}></div>;
}

export default MapWrapper;
