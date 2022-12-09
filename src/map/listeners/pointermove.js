// Openlayers
import { Point } from "ol/geom";

export const mapPointerMove = ({
  map,
  popup,
  featureNameRef,
  featureTitleRef,
}) => {
  map.on("pointermove", (e) => {
    popup.setPosition(undefined);
    map.getTargetElement().style.cursor = "";

    map.forEachFeatureAtPixel(e.pixel, (feature) => {
      const geo = feature.getGeometry();
      if (geo instanceof Point) {
        const coord = e.coordinate;

        const name = feature.get("name");
        const title = feature.get("title");

        if (name) {
          featureNameRef.current.innerHTML = name + "<br>";
          featureTitleRef.current.innerHTML = title;

          popup.setPosition(coord);
        }
      }
      map.getTargetElement().style.cursor = "pointer";
    });
  });
};
