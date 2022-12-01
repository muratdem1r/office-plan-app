import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { createAvatarFeature, createLayerGroup } from "map/helpers";
import { newMap, newPlan, selectPlan } from "store/actions/mapActions";

import members from "constants/members";

// Openlayers
import Map from "ol/Map";
import View from "ol/View";
import { getCenter } from "ol/extent";

// Create default layers
const layerGroup = createLayerGroup(1, "mahrek");
const ortem = createLayerGroup(1, "ortem");
const militera = createLayerGroup(2, "militera");

// ADD FEATURES TO FIRST MAP
members.forEach((member) => {
  const { coords, image, name, title } = member;
  const newFeature = createAvatarFeature(coords, image, name, title);

  layerGroup.getLayers().item(1).getSource().addFeature(newFeature);
});

function useCreateMap(mapRef) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      newMap(
        new Map({
          target: mapRef.current,
          view: new View({
            // center by image sizes
            center: getCenter([0, 0, 825, 805]),
            resolution: 1,
            maxResolution: 1,
            extent: [0, 0, 825, 805],
          }),
        })
      )
    );

    // Create default plans
    dispatch(newPlan(layerGroup));
    dispatch(newPlan(ortem));
    dispatch(newPlan(militera));
    dispatch(selectPlan("mahrek"));
  }, []);

  return;
}

export default useCreateMap;
