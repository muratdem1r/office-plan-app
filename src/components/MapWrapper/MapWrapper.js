import { useRef } from "react";

import Popup from "../Popup/Popup";

// Openlayers
import Overlay from "ol/Overlay";

// Custom Hooks
import useCreateMap from "map/hooks/useCreateMap";
import useMapEvents from "map/hooks/useMapEvents";

import styles from "./MapWrapper.module.css";

function MapWrapper() {
  const mapRef = useRef();
  const popupRef = useRef();
  const featureNameRef = useRef();
  const featureTitleRef = useRef();

  const popup = new Overlay({
    element: popupRef.current,
  });

  useCreateMap(mapRef);
  useMapEvents(popup, featureNameRef, featureTitleRef);

  return (
    <div>
      <div ref={mapRef} className={styles.map}></div>
      <Popup
        popup={popup}
        popupRef={popupRef}
        featureNameRef={featureNameRef}
        featureTitleRef={featureTitleRef}
      />
    </div>
  );
}

export default MapWrapper;
