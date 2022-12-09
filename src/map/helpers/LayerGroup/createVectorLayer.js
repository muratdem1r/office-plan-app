// Openlayers
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export const createVectorLayer = () => {
  return new VectorLayer({
    source: new VectorSource(),
    preload: Infinity,
  });
};
