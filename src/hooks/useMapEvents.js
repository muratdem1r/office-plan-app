import { useEffect } from "react";
import { useSelector } from "react-redux";

import { mapSingleClick } from "map/listeners/singleclick";
import { mapPointerMove } from "map/listeners/pointermove";

function useMapEvents(popup, featureNameRef, featureTitleRef) {
  const map = useSelector((state) => state.map);
  const selectedLayerGroup = useSelector((state) => state.selectedLayerGroup);

  useEffect(() => {
    if (map) {
      // Map Event Listeners
      mapSingleClick(map, popup, featureNameRef, featureTitleRef);
      mapPointerMove(map);
    }
  }, [map, selectedLayerGroup]);

  return;
}

export default useMapEvents;
