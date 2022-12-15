// OpenLayers
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style, Fill, Circle } from "ol/style";
import { fromLonLat } from "ol/proj";
import { transform } from "ol/proj";
import Stroke from "ol/style/Stroke";

export const createFeature = ({
  coords,
  image,
  color = "#ffcc33",
  name,
  title,
}) => {
  // Transform coord
  const transformedCoord = transform(coords, "EPSG:3857", "EPSG:4326");

  // Create new feature
  const feature = new Feature({
    geometry: new Point(fromLonLat(transformedCoord)),
    name,
    title,
  });

  // Style created feature

  if (image) {
    feature.setStyle(
      new Style({
        image: new Icon({
          crossOrigin: "anonymous",
          src: image,
        }),
        zIndex: 1,
      })
    );
  } else {
    feature.setStyle(
      new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({ color }),
          stroke: new Stroke({ color, width: 20 }),
          zIndex: 1,
        }),
      })
    );
  }

  return feature;
};
