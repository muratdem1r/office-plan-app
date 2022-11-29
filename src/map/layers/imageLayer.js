import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";

import office from "assets/images/office.png";

export const imageLayer = new ImageLayer({
  source: new Static({
    url: office,
    // image sizes
    imageExtent: [0, 0, 825, 805],
    floor: 1,
  }),
});
