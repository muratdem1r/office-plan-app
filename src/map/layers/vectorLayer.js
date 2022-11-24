import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export const vectorSource = new VectorSource();
export const vectorLayer = new VectorLayer({
  source: vectorSource,
  preload: Infinity,
});
