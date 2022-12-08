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
import Icon, {
  ShareAltOutlined,
  BorderOutlined,
  Loading3QuartersOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { RxCursorArrow } from "react-icons/rx";

import styles from "./Controllers.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createDraw } from "map/interactions/createDraw";
import { Select } from "ol/interaction";
import { useEffect } from "react";
import { addRoom } from "store/actions/mapActions";
import useFindBySelectedKey from "map/hooks/useFindBySelectedKey";
import { createSnap } from "map/interactions/createSnap";
import { createModify } from "map/interactions/createModify";

import { Fill, Circle, Style } from "ol/style";

import { RgbaStringColorPicker } from "react-colorful";

const CursorIcon = (props) => <Icon component={RxCursorArrow} {...props} />;

function Controllers({ popup, featureNameRef, featureTitleRef }) {
  const dispatch = useDispatch();
  const { selectedOfficeKey, map } = useSelector((state) => state);
  const office = useFindBySelectedKey();

  const [type, setType] = useState("Cursor");
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [snapInteraction, setSnapInteraction] = useState(null);
  const [modifyInteraction, setModifyInteraction] = useState(null);
  const [selectInteraction, setSelectInteraction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastFeature, setLastFeature] = useState(null);

  const [color, setColor] = useState("#ffcc33");

  const formSubmitHandler = ({ name, title }) => {
    console.log(lastFeature);

    lastFeature.set("name", name);
    lastFeature.set("title", title);

    setIsModalOpen(false);
  };
  const cancelFormHandler = () => {
    const { layerGroup } = office;
    layerGroup.getLayers().array_[1].getSource().removeFeature(lastFeature);
    setIsModalOpen(false);
  };

  const colorChangeHandler = (value) => {
    setColor(value);
    if (type === "Point") {
      drawInteraction?.on("drawstart", (e) => {
        e.feature.setStyle(
          new Style({
            image: new Circle({
              radius: 7,
              fill: new Fill({ color }),
              zIndex: 1,
            }),
          })
        );
      });
    } else {
      drawInteraction?.on("drawstart", (e) => {
        e.feature.setStyle(
          new Style({
            fill: new Fill({ color: value }),
            zIndex: 2,
          })
        );
      });
    }
  };

  const typeChangeHandler = (e) => {
    const type = e.target.value;
    setType(type);

    // CLEAR Interactions
    map.removeInteraction(drawInteraction);
    map.removeInteraction(snapInteraction);
    map.removeInteraction(modifyInteraction);
    map.removeInteraction(selectInteraction);

    if (type === "Cursor") {
      const select = new Select({});

      map.addInteraction(select);

      select.on("select", (e) => {
        popup.setPosition(undefined);

        if (!e.selected[0]) return;

        const coord = e.mapBrowserEvent.coordinate;

        const name = e.selected[0].get("name");
        const title = e.selected[0].get("title");

        if (name) {
          featureNameRef.current.innerHTML = name + "<br>";
          featureTitleRef.current.innerHTML = title;

          popup.setPosition(coord);
        }
      });

      setSelectInteraction(select);
      return;
    }

    const { layerGroup } = office;
    let draw;

    // CREATE Interactions
    const snap = createSnap(layerGroup);
    const modify = createModify(layerGroup);
    if (type !== "Edit") draw = createDraw(layerGroup, type);

    // ADD Interactins to Map
    map.addInteraction(snap);
    map.addInteraction(modify);
    if (type !== "Edit") map.addInteraction(draw);

    // SAVE Interactions for clear on change
    setSnapInteraction(snap);
    setModifyInteraction(modify);
    if (type !== "Edit") setDrawInteraction(draw);

    if (type !== "Edit") {
      if (type === "Point") {
        draw.on("drawstart", (e) => {
          setLastFeature(e.feature);
          setIsModalOpen(true);
          e.feature.setStyle(
            new Style({
              image: new Circle({
                radius: 7,
                fill: new Fill({ color }),
                zIndex: 1,
              }),
            })
          );
        });
      } else {
        draw.on("drawstart", (e) => {
          e.feature.setStyle(
            new Style({
              fill: new Fill({ color }),
              zIndex: 2,
            })
          );
        });
        draw.on("drawend", (e) => {
          dispatch(addRoom(e.feature));
        });
      }
    }
  };

  useEffect(() => {
    if (selectedOfficeKey) {
      // CLEAR Interactions
      map.removeInteraction(drawInteraction);
      map.removeInteraction(snapInteraction);
      map.removeInteraction(modifyInteraction);
      setType(null);
    }
  }, [selectedOfficeKey]);

  return (
    <Space className={styles.controllers}>
      <Tooltip title="Oda Rengi">
        <Popover
          trigger="click"
          content={
            <RgbaStringColorPicker
              color={color}
              onChange={colorChangeHandler}
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
      <Radio.Group value={type} onChange={typeChangeHandler}>
        <Radio.Button value="Cursor">
          <Tooltip title="İmleç">
            <CursorIcon />
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
