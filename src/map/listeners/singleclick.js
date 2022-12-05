import { createPointFeature } from "map/helpers/createFeature";

export const mapSingleClick = (map, popup, featureNameRef, featureTitleRef) => {
  map.on("singleclick", (e) => {
    popup.setPosition(undefined);

    const hasFeature = map.hasFeatureAtPixel(e.pixel);

    if (hasFeature) {
      map.forEachFeatureAtPixel(e.pixel, (feature) => {
        featureNameRef.current.innerHTML = feature.get("name") + "<br>";
        featureTitleRef.current.innerHTML = feature.get("title");

        popup.setPosition(e.coordinate);
      });
    } else {
      const feature = createPointFeature(e.pixel);
    }
  });
};
