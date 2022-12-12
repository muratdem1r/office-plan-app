// Openlayers
import { Point } from "ol/geom";

export const mapPointerMove = ({ map, popup, popupRef }) => {
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
          popupRef.current.children["popup-name"].innerHTML = name + "<br>";
          popupRef.current.children["popup-title"].innerHTML = title;

          popup.setPosition(coord);
        }
      }
      map.getTargetElement().style.cursor = "pointer";
    });
  });
};
