export const mapSingleClick = (map, popup, featureNameRef, featureTitleRef) => {
  map.on("singleclick", (e) => {
    popup.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, (feature) => {
      featureNameRef.current.innerHTML = feature.get("name") + "<br>";
      featureTitleRef.current.innerHTML = feature.get("title");

      popup.setPosition(e.coordinate);
    });
  });
};
