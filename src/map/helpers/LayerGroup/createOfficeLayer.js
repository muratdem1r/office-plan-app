import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";
import { Projection } from "ol/proj";

export const createOfficeLayer = (extent, src) => {
  const projection = new Projection({
    code: "xkcd-image",
    units: "pixels",
    extent: extent,
  });

  return new ImageLayer({
    source: new Static({
      url: src,
      projection: projection,
      imageExtent: extent,
    }),
  });
};
