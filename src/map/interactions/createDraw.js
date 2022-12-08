import Draw, { createBox, createRegularPolygon } from "ol/interaction/Draw";

export const createDraw = (layerGroup, type = "Circle") => {
  // VectorLayer source
  const source = layerGroup.getLayers().array_[1].getSource();
  let geometryFunction;

  if (type === "Square") {
    type = "Circle";
    geometryFunction = createRegularPolygon(4);
  }

  const draw = new Draw({
    source: source,
    type,
    geometryFunction: geometryFunction,
  });
  return draw;
};
