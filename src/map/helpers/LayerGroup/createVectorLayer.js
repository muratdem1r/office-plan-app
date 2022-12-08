import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export const createVectorLayer = () => {
  return new VectorLayer({
    source: new VectorSource(),
    preload: Infinity,
    style: {
      "fill-color": "rgba(255, 255, 255, 1)",
      "stroke-color": "#ffcc33",
      "stroke-width": 2,
      "circle-radius": 7,
      "circle-fill-color": "#ffcc33",
    },
  });
};
