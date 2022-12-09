import { useEffect } from "react";
import { useSelector } from "react-redux";

// Listeners
import { mapPointerMove } from "map/listeners/pointermove";

function useMapEvents({ popup, featureNameRef, featureTitleRef }) {
  const { map } = useSelector((state) => state);

  useEffect(() => {
    if (map) {
      // Map Event Listeners
      mapPointerMove({ map, popup, featureNameRef, featureTitleRef });
    }
  }, [map]);

  return;
}

export default useMapEvents;
