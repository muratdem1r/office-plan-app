import { Button, Dropdown, Form, Radio, Space, Tooltip } from "antd";
import Icon, {
  ShareAltOutlined,
  BorderOutlined,
  DownOutlined,
  Loading3QuartersOutlined,
  HomeOutlined,
  DragOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { RxCursorArrow } from "react-icons/rx";

import styles from "./Controllers.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findObj } from "map/helpers/findObj";

import { createDraw, draw } from "map/interactions/createDraw";
import { Draw, Modify, Snap, Select } from "ol/interaction";
import { useEffect } from "react";
import { addEmployee, addRoom } from "store/actions/mapActions";
import useFindBySelectedKey from "map/hooks/useFindBySelectedKey";
import { createSnap } from "map/interactions/createSnap";
import { createModify } from "map/interactions/createModify";

import { Fill, Stroke, Circle, Style } from "ol/style";
const CursorIcon = (props) => <Icon component={RxCursorArrow} {...props} />;

function Controllers() {
  const dispatch = useDispatch();
  const { selectedOfficeKey, map } = useSelector((state) => state);
  const office = useFindBySelectedKey();

  const [type, setType] = useState(null);
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [snapInteraction, setSnapInteraction] = useState(null);
  const [modifyInteraction, setModifyInteraction] = useState(null);
  const [selectInteraction, setSelectInteraction] = useState(null);

  const typeChangeHandler = (e) => {
    const type = e.target.value;
    setType(type);

    // CLEAR Interactions
    map.removeInteraction(drawInteraction);
    map.removeInteraction(snapInteraction);
    map.removeInteraction(modifyInteraction);
    map.removeInteraction(selectInteraction);

    if (type === "Cursor") {
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

    if (type !== "Edit" && type !== "Point") {
      draw.on("drawend", (e) => {
        dispatch(addRoom(e.feature));
      });
    } else if (type === "Point") {
      // const select = new Select();
      // select.on("select", (e) => {
      //   console.log(e);
      // });
      // map.addInteraction(select);
      // draw.on("drawstart", (e) => {});
      // draw.on("drawend", (e) => {
      //   console.log("drawend");
      // });
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
    </Space>
  );
}

export default Controllers;
