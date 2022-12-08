import { useEffect } from "react";
import { useSelector } from "react-redux";

import { mapPointerMove } from "map/listeners/pointermove";

function useMapEvents() {
  const { map } = useSelector((state) => state);

  useEffect(() => {
    if (map) {
      // Map Event Listeners
      mapPointerMove(map);
    }
  }, [map]);

  return;
}

export default useMapEvents;
