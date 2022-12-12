// Openlayers
import { Point } from "ol/geom";
import { Select } from "ol/interaction";

import eyePng from "assets/images/eye.png";

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
      } else {
        map.getInteractions().forEach((interaction) => {
          if (interaction instanceof Select) {
            if (interaction.get("type") === "Hide") {
              map.getTargetElement().style.cursor = `url("${eyePng}") , auto`;
            }
          }
        });
      }
    });
  });
};
