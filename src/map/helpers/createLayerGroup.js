import LayerGroup from "ol/layer/Group";

import { createOfficeLayer } from "./createOfficeLayer";
import { createVectorLayer } from "./createVectorLayer";

export const createLayerGroup = (floor, name) => {
  const officeLayer = createOfficeLayer();
  const vectorLayer = createVectorLayer();

  const layerGroup = new LayerGroup({
    layers: [officeLayer, vectorLayer],
    visible: false,
    name: name,
    floor: floor,
  });

  return { officeLayer, vectorLayer, layerGroup };
};
