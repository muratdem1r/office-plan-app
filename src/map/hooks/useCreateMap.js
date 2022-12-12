import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Openlayers
import Map from "ol/Map";

// Actions
import { newMap } from "store/actions/mapActions";

// Listeners
import { mapPointerMove } from "map/listeners/pointermove";
import { useRef } from "react";
import { useState } from "react";

function useCreateMap({ popup, popupRef }) {
  const dispatch = useDispatch();
  const mapRef = useRef();
  const [result, setResult] = useState({ mapRef });

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      controls: [],
    });

    dispatch(newMap(map));
    setResult((prev) => {
      return { ...prev, map };
    });

    // Map Event Listeners
    mapPointerMove({ map, popup, popupRef });

    // Overlays
    map.addOverlay(popup);
    // eslint-disable-next-line
  }, []);

  return result;
}

export default useCreateMap;
