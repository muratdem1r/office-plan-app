export const mapPointerMove = (map) => {
  map.on("pointermove", (e) => {
    map.getTargetElement().style.cursor = "";
    map.forEachFeatureAtPixel(e.pixel, (_) => {
      map.getTargetElement().style.cursor = "pointer";
    });
  });
};
