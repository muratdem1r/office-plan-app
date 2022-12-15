import { Button, Dropdown, Radio, Space, Tooltip } from "antd";
import {
  EditOutlined,
  EyeInvisibleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { RxCursorArrow, RxHand } from "react-icons/rx";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Styles
import styles from "./Controllers.module.css";
import { Fill, Stroke, Circle, Style } from "ol/style";

// Openlayers
import { Select } from "ol/interaction";
import Translate from "ol/interaction/Translate";
import { Point } from "ol/geom";

// Interactions
import { createDraw } from "map/interactions/createDraw";
import { createSnap } from "map/interactions/createSnap";
import { createModify } from "map/interactions/createModify";

// Actions
import { addRoom } from "store/actions/mapActions";

// Custom Hooks
import useFindBySelectedKey from "map/hooks/useFindBySelectedKey";

// Helpers
import clearInteractions from "map/helpers/clearInteractions";

// Components
import NewEmployeeForm from "./NewEmployeeForm";
import ColorPicker from "./ColorPicker";
import roomItems from "./roomItems";

function Controllers() {
  const dispatch = useDispatch();
  const { selectedOfficeKey, map } = useSelector((state) => state);
  const office = useFindBySelectedKey();

  const [type, setType] = useState("Cursor");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastFeature, setLastFeature] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [color, setColor] = useState("#ffcc33");

  const skipFirstColorChange = useRef(true);

  const pointStyle = new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({ color }),
      stroke: new Stroke({ color, width: 20 }),
      zIndex: 1,
    }),
  });

  const showStyle = new Style({
    fill: new Fill({ color }),
    stroke: new Stroke({ color }),
    zIndex: 2,
  });

  const transparentStyle = new Style({
    fill: new Fill({ color: "rgba(0,0,0,0.5)" }),
    stroke: new Stroke({ color }),
    zIndex: 2,
  });

  const typeChangeHandler = (e) => {
    const { layerGroup } = office;

    const type = e.target.value;
    setType(type);

    // CLEAR Interactions
    clearInteractions(map, interactions);

    setInteractions([]);
    switch (type) {
      case "Cursor":
        break;
      case "Hide":
        const select = new Select({
          style: null,
        });

        select.set("type", type);

        select.on("select", (e) => {
          const feature = e.selected[0];

          if (feature?.getGeometry() instanceof Point) return;
          if (feature) {
            const style = feature.get("style");
            const transparentStyle = feature.get("transparentStyle");
            const showStyle = feature.get("showStyle");
            if (style === transparentStyle) {
              feature.setStyle(showStyle);
              feature.set("style", showStyle);
            } else if (style === showStyle) {
              feature.setStyle(transparentStyle);
              feature.set("style", transparentStyle);
            }
          }

          if (!e.selected[0]) return;
          select.getFeatures().clear();
        });

        // ADD Interaction
        map.addInteraction(select);
        setInteractions((prev) => [...prev, select]);
        break;
      case "Move":
        const translate = new Translate();

        // ADD Interaction
        map.addInteraction(translate);
        setInteractions((prev) => [...prev, translate]);
        break;
      case "Edit":
        const snap = createSnap(layerGroup);
        const modify = createModify(layerGroup);

        // ADD Interaction
        map.addInteraction(snap);
        map.addInteraction(modify);
        setInteractions((prev) => [...prev, snap, modify]);
        break;
      case "Point":
        const pointDraw = createDraw(layerGroup, type);

        pointDraw.on("drawstart", (e) => {
          console.log(e.feature.getGeometry().getCoordinates());
          setLastFeature(e.feature);
          setIsModalOpen(true);
          e.feature.setStyle(pointStyle);
        });

        // ADD Interaction
        map.addInteraction(pointDraw);
        setInteractions((prev) => [...prev, pointDraw]);
        break;
      default:
        const draw = createDraw(layerGroup, type);

        draw.on("drawstart", (e) => {
          // SAVE Styles for select interaction
          e.feature.set("showStyle", showStyle);
          e.feature.set("transparentStyle", transparentStyle);
          e.feature.setStyle(e.feature.get("showStyle"));
        });

        draw.on("drawend", (e) => {
          // DEFAULT style
          e.feature.set("style", e.feature.get("transparentStyle"));
          e.feature.setStyle(e.feature.get("transparentStyle"));

          dispatch(addRoom(e.feature));
        });

        // ADD Interaction
        map.addInteraction(draw);
        setInteractions((prev) => [...prev, draw]);
        break;
    }
  };

  // create new interactions with new layerGroup on office plan change
  useEffect(() => {
    if (selectedOfficeKey) {
      // Fake event
      const e = { target: { value: null } };
      e.target.value = type;
      typeChangeHandler(e);
    }
    // eslint-disable-next-line
  }, [selectedOfficeKey]);

  useEffect(() => {
    if (skipFirstColorChange.current) {
      skipFirstColorChange.current = false;
    } else {
      // Fake event
      const e = { target: { value: null } };
      e.target.value = type;
      typeChangeHandler(e);
    }
    // eslint-disable-next-line
  }, [color]);

  return (
    <Space className={styles.controllers}>
      <ColorPicker color={color} setColor={setColor} />
      <Radio.Group defaultValue={"Cursor"} onChange={typeChangeHandler}>
        <Tooltip title="İmleç">
          <Radio.Button value="Cursor">
            <RxCursorArrow className="anticon" />
          </Radio.Button>
        </Tooltip>

        <Tooltip title="Düzenle">
          <Radio.Button value="Edit">
            <EditOutlined />
          </Radio.Button>
        </Tooltip>

        <Tooltip title="Hareket Ettir">
          <Radio.Button value="Move">
            <RxHand className="anticon" />
          </Radio.Button>
        </Tooltip>

        <Tooltip title="Oda Göster/Gizle">
          <Radio.Button value="Hide">
            <EyeInvisibleOutlined />
          </Radio.Button>
        </Tooltip>

        <Tooltip placement="left" title="Oda Ekle">
          <Dropdown
            menu={{
              items: roomItems,
            }}
          >
            <Button className={styles.radio_button}>
              <HomeOutlined />
            </Button>
          </Dropdown>
        </Tooltip>

        <NewEmployeeForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          lastFeature={lastFeature}
          office={office}
        />
      </Radio.Group>
    </Space>
  );
}

export default Controllers;
