// Helpers
import { createLayerGroup } from "map/helpers/LayerGroup/createLayerGroup";

// Images
import mahrekImg from "assets/images/office_plans/mahrek.png";
import toggImg from "assets/images/office_plans/togg.jpg";
import ortemImg from "assets/images/office_plans/ortem.jpg";
import yemeksepetiImg from "assets/images/office_plans/yemeksepeti.jpg";

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

const yemeksepeti = createLayerGroup({
  width: 1280,
  height: 720,
  src: yemeksepetiImg,
});
const togg = createLayerGroup({
  width: 800,
  height: 600,
  src: toggImg,
});

const plans = [
  {
    layerGroup: ortem.layerGroup,
    extent: ortem.extent,
    name: "ortem",
    floor: "1",
  },
  {
    layerGroup: yemeksepeti.layerGroup,
    extent: yemeksepeti.extent,
    name: "yemeksepeti",
    floor: "1",
  },
  {
    layerGroup: togg.layerGroup,
    extent: togg.extent,
    name: "togg",
    floor: "2",
  },
  {
    layerGroup: mahrek.layerGroup,
    extent: mahrek.extent,
    name: "mahrek",
    floor: "0",
  },
];

export default plans;
