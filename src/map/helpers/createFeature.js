// OpenLayers
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import { fromLonLat } from "ol/proj";
import { transform } from "ol/proj";

export const createAvatarFeature = (coords, image, name, title) => {
  // Transform coord
  const transformedCoord = transform(coords, "EPSG:3857", "EPSG:4326");

  // Create new feature
  const feature = new Feature({
    geometry: new Point(fromLonLat(transformedCoord)),
    name,
    title,
  });

  // Style created feature
  feature.setStyle(
    new Style({
      image: new Icon({
        crossOrigin: "anonymous",
        src: image,
      }),
      zIndex: 1,
    })
  );
  return feature;
};
