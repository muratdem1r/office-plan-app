import { useEffect } from "react";
import { useDispatch } from "react-redux";

import img from "assets/images/office.png";

// Openlayers
import Map from "ol/Map";

import { addPlan, newMap } from "store/actions/mapActions";
import { createLayerGroup } from "map/helpers/LayerGroup/createLayerGroup";

const { layerGroup, extent } = createLayerGroup({
  width: 825,
  height: 805,
  src: img,
});

function useCreateMap(mapRef) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      newMap(
        new Map({
          target: mapRef.current,
          controls: [],
        })
      )
    );

    //default plan
    dispatch(addPlan({ layerGroup, extent, name: "mahrek", floor: "1" }));
  }, []);

  return;
}

export default useCreateMap;
