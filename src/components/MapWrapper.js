import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Openlayers
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { getCenter } from "ol/extent";

import { createFeature, createLayerGroup } from "map/helpers";

import members from "constants/members";
import Popup from "./Popup/Popup";
import { mapSingleClick } from "map/listeners/singleclick";
import { mapPointerMove } from "map/listeners/pointermove";
import { newMap, newPlan } from "store/actions/mapActions";

function MapWrapper() {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const selectedLayerGroup = useSelector((state) => state.selectedLayerGroup);
  const mapRef = useRef();
  const popupRef = useRef();
  const featureNameRef = useRef();
  const featureTitleRef = useRef();

  const popup = new Overlay({
    element: popupRef.current,
  });

  // Create default layers
  const { layerGroup } = createLayerGroup(1, "mahrek");

  // ADD FEATURES TO FIRST MAP
  members.forEach((member) => {
    const { coords, image, name, title } = member;
    const newFeature = createFeature(coords, image, name, title);

    layerGroup.getLayers().item(1).getSource().addFeature(newFeature);
  });

  // COMPONENT CONSTRUCTOR
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

    dispatch(newPlan(layerGroup));
  }, [dispatch]);

  // MAP IS READY
  useEffect(() => {
    if (map) {
      // Map Event Listeners
      mapSingleClick(map, popup, featureNameRef, featureTitleRef);
      mapPointerMove(map);
    }
  }, [map]);

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
