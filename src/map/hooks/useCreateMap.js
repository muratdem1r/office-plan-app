import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Images
import img from "assets/images/office.png";
import img2 from "assets/images/office2.jpg";

// Openlayers
import Map from "ol/Map";

// Actions
import { addPlan, newMap } from "store/actions/mapActions";

// Helpers
import { createLayerGroup } from "map/helpers/LayerGroup/createLayerGroup";
import { createAvatarFeature } from "map/helpers/createFeature";

// Contants
import members from "constants/members";

// Listeners
import { mapPointerMove } from "map/listeners/pointermove";

const plan1 = createLayerGroup({
  width: 825,
  height: 805,
  src: img,
});
const plan2 = createLayerGroup({
  width: 800,
  height: 533,
  src: img2,
});

function useCreateMap({ mapRef, popup, popupRef }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      controls: [],
    });

    dispatch(newMap(map));

    // Map Event Listeners
    mapPointerMove({ map, popup, popupRef });

    // Default map plans
    dispatch(
      addPlan({
        layerGroup: plan2.layerGroup,
        extent: plan2.extent,
        name: "ortem",
        floor: "2",
      })
    );
    dispatch(
      addPlan({
        layerGroup: plan1.layerGroup,
        extent: plan1.extent,
        name: "mahrek",
        floor: "1",
      })
    );

    // Add features to plan1
    members.forEach((member) => {
      const { coords, image, name, title } = member;
      const newFeature = createAvatarFeature(coords, image, name, title);

      plan1.layerGroup.getLayers().item(1).getSource().addFeature(newFeature);
    });
  }, []);

  return;
}

export default useCreateMap;
