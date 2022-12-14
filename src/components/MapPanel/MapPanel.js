import { Space, Tree } from "antd";
import { useDispatch, useSelector } from "react-redux";

import styles from "./MapPanel.module.css";

// Actions
import {
  changePlan,
  movePlan,
  removePlan,
  removeRoom,
} from "store/actions/mapActions";

// Components
import NewOfficeForm from "./NewOfficeForm";
import NewFloorButton from "./NewFloorButton";
import { findObj } from "map/helpers/findObj";
import { useState } from "react";

function MapPanel() {
  const dispatch = useDispatch();
  const { treeData } = useSelector((state) => state);
  const [oldFeature, setOldFeature] = useState(null);
  const [oldStyle, setOldStyle] = useState(null);

  const onSelect = (selectedKeys) => {
    const key = selectedKeys[0];
    if (key?.length === 3) {
      dispatch(changePlan(key));
    } else if (key?.length === 5) {
      if (oldFeature) {
        oldFeature.setStyle(oldStyle);
      }

      const { feature } = findObj(treeData, key);
      setOldFeature(feature);
      setOldStyle(feature.getStyle());

      feature.setStyle(null);
    }
  };

  const onDrop = (e) => {
    const key = e.dragNode.key;
    const destinationKey = e.node.key.slice(0, 1);

    // Check for is drag item plan or not
    if (key.length === 3) {
      dispatch(movePlan(key, destinationKey));
    }
  };
  const onRightClick = (e) => {
    const { key, children } = e.node;

    // Check for item plan or not
    if (key.length === 3) {
      dispatch(removePlan(key));
    } else if (key.length === 5) {
      dispatch(removeRoom(key));
    } else if (key.length === 1 && children.length === 0) {
      dispatch(removePlan(key));
    }
  };

  return (
    <div className={styles.map_panel}>
      <Tree
        showLine={true}
        defaultExpandAll
        onSelect={onSelect}
        treeData={treeData}
        selectable
        draggable
        onDrop={onDrop}
        onRightClick={onRightClick}
      />
      <Space direction="vertical">
        <NewFloorButton />
        <NewOfficeForm />
        <p className={styles.deleteInfo}>
          Press right click <br />
          for <span className={styles.alert}>DELETE</span>
        </p>
      </Space>
    </div>
  );
}

export default MapPanel;
