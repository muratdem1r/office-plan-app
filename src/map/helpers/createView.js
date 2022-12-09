// Openlayers
import View from "ol/View";
import { getCenter } from "ol/extent";
import { Projection } from "ol/proj";

export const createView = (extent) => {
  const projection = new Projection({
    code: "xkcd-image",
    units: "pixels",
    extent: extent,
  });

  return new View({
    // center by image sizes
    projection: projection,
    center: getCenter(extent),
    zoom: 3,
    maxZoom: 8,
  });
};
