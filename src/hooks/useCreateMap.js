import { useEffect } from "react";
import { useDispatch } from "react-redux";

import img from "assets/images/office.png";

// Openlayers
import Map from "ol/Map";

import { addPlan, newMap } from "store/actions/mapActions";
import { createLayerGroup } from "map/helpers/LayerGroup/createLayerGroup";
import members from "constants/members";
import { createAvatarFeature } from "map/helpers/createFeature";

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

    // ADD FEATURES TO FIRST MAP
    members.forEach((member) => {
      const { coords, image, name, title } = member;
      const newFeature = createAvatarFeature(coords, image, name, title);

      layerGroup.getLayers().item(1).getSource().addFeature(newFeature);
    });
  }, []);

  return;
}

export default useCreateMap;
