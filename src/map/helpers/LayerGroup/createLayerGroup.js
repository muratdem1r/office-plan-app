import LayerGroup from "ol/layer/Group";

import { createOfficeLayer } from "./createOfficeLayer";
import { createVectorLayer } from "./createVectorLayer";

export const createLayerGroup = (imageInfos) => {
  const { width, height, src } = imageInfos;
  const extent = [0, 0, width, height];

  const officeLayer = createOfficeLayer(extent, src);
  const vectorLayer = createVectorLayer();

  const layerGroup = new LayerGroup({
    layers: [officeLayer, vectorLayer],
    visible: false,
  });

  return { layerGroup, extent };
};
