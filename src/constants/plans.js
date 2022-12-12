// Helpers
import { createLayerGroup } from "map/helpers/LayerGroup/createLayerGroup";

// Images
import mahrekImg from "assets/images/office.png";
import ortemImg from "assets/images/office2.jpg";

const mahrek = createLayerGroup({
  width: 825,
  height: 805,
  src: mahrekImg,
});
const ortem = createLayerGroup({
  width: 800,
  height: 533,
  src: ortemImg,
});

const plans = [
  {
    layerGroup: ortem.layerGroup,
    extent: ortem.extent,
    name: "ortem",
    floor: "2",
  },
  {
    layerGroup: mahrek.layerGroup,
    extent: mahrek.extent,
    name: "mahrek",
    floor: "1",
  },
];

export default plans;
