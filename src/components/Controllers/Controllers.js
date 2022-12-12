import {
  Button,
  Form,
  Input,
  Modal,
  Popover,
  Radio,
  Space,
  Tooltip,
} from "antd";
import {
  ShareAltOutlined,
  BorderOutlined,
  Loading3QuartersOutlined,
  EditOutlined,
  UserAddOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { RxCursorArrow, RxHand } from "react-icons/rx";

import styles from "./Controllers.module.css";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createDraw } from "map/interactions/createDraw";
import { Select } from "ol/interaction";
import Translate from "ol/interaction/Translate";
import { useEffect } from "react";
import { addRoom } from "store/actions/mapActions";
import useFindBySelectedKey from "map/hooks/useFindBySelectedKey";
import { createSnap } from "map/interactions/createSnap";
import { createModify } from "map/interactions/createModify";

import { Fill, Stroke, Circle, Style } from "ol/style";

import { RgbaStringColorPicker } from "react-colorful";
import { Point } from "ol/geom";
import clearInteractions from "map/helpers/clearInteractions";

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
      zIndex: 1,
    }),
  });

  const showStyle = new Style({
    fill: new Fill({ color }),
    zIndex: 2,
  });

  const transparentStyle = new Style({
    fill: new Fill({ color: "rgba(0,0,0,0.5)" }),
    stroke: new Stroke({ color }),
    zIndex: 2,
  });

  const formSubmitHandler = ({ name, title }) => {
    lastFeature.set("name", name);
    lastFeature.set("title", title);

    setIsModalOpen(false);
  };

  const cancelFormHandler = () => {
    const { layerGroup } = office;
    layerGroup.getLayers().array_[1].getSource().removeFeature(lastFeature);
    setIsModalOpen(false);
  };

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
      <Tooltip title="Oda Rengi">
        <Popover
          trigger="click"
          content={
            <RgbaStringColorPicker
              color={color}
              onChange={(value) => setColor(value)}
            />
          }
        >
          <Space style={{ cursor: "pointer" }}>
            <div
              style={{
                backgroundColor: color,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            />
          </Space>
        </Popover>
      </Tooltip>
      <Radio.Group defaultValue={"Cursor"} onChange={typeChangeHandler}>
        <Radio.Button value="Cursor">
          <Tooltip title="İmleç">
            <RxCursorArrow />
          </Tooltip>
        </Radio.Button>
        <Radio.Button value="Hide">
          <Tooltip title="Oda Göster/Gizle">
            <EyeInvisibleOutlined />
          </Tooltip>
        </Radio.Button>
        <Radio.Button value="Move">
          <Tooltip title="Hareket Ettir">
            <RxHand />
          </Tooltip>
        </Radio.Button>
        <Radio.Button value="Edit">
          <Tooltip title="Düzenle">
            <EditOutlined />
          </Tooltip>
        </Radio.Button>
        <Radio.Button value="Polygon">
          <Tooltip title="Poligon">
            <ShareAltOutlined />
          </Tooltip>
        </Radio.Button>
        <Radio.Button value="Square">
          <Tooltip title="Kare">
            <BorderOutlined />
          </Tooltip>
        </Radio.Button>
        <Radio.Button value="Circle">
          <Tooltip title="Daire">
            <Loading3QuartersOutlined />
          </Tooltip>
        </Radio.Button>
        <Radio.Button value="Point">
          <Tooltip title="Çalışan Ekle">
            <UserAddOutlined />
          </Tooltip>
        </Radio.Button>
      </Radio.Group>

      <Modal
        title="Yeni Çalışan"
        open={isModalOpen}
        footer={null}
        onCancel={cancelFormHandler}
      >
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 12,
          }}
          layout="horizontal"
          initialValues={{
            size: "large",
          }}
          size="large"
          onFinish={formSubmitHandler}
          validateMessages={{
            required: "Zorunlu alan.",
          }}
        >
          <Form.Item
            name="name"
            label="Çalışan Adı"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Görevi"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}

export default Controllers;
