import { useRef } from "react";

import Popup from "./Popup/Popup";

// Openlayers
import Overlay from "ol/Overlay";

// Custom Hooks
import useCreateMap from "hooks/useCreateMap";
import useMapEvents from "hooks/useMapEvents";

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
      <div ref={mapRef} className="map"></div>
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
