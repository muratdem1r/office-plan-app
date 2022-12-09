// Openlayers
import { Modify } from "ol/interaction";

export const createModify = (layerGroup) => {
  // VectorLayer source
  const source = layerGroup.getLayers().array_[1].getSource();

  const modify = new Modify({ source });

  return modify;
};
