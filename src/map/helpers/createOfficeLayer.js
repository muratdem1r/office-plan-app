import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";

import office from "assets/images/office.png";

export const createOfficeLayer = () => {
  return new ImageLayer({
    source: new Static({
      url: office,
      // image sizes
      imageExtent: [0, 0, 825, 805],
    }),
  });
};