// Openlayers
import { Snap } from "ol/interaction";

export const createSnap = (layerGroup) => {
  // VectorLayer source
  const source = layerGroup.getLayers().array_[1].getSource();

  const snap = new Snap({ source });

  return snap;
};
