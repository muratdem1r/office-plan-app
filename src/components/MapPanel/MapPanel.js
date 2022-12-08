import { Space, Tree } from "antd";
import { useDispatch, useSelector } from "react-redux";

import NewOfficeForm from "./NewOfficeForm";

import { changePlan } from "store/actions/mapActions";
import NewFloorButton from "./NewFloorButton";

import styles from "./MapPanel.module.css";

function MapPanel() {
  const dispatch = useDispatch();
  const { treeData, map } = useSelector((state) => state);

  const onSelect = (selectedKeys) => {
    if (selectedKeys[0]?.length === 3) {
      const key = selectedKeys[0];

      dispatch(changePlan(key));
    }
  };

  return (
    <div className={styles.map_panel}>
      <Tree
        showLine={true}
        defaultExpandAll
        onSelect={onSelect}
        treeData={treeData}
      />
      <Space direction="vertical">
        <NewFloorButton />
        <NewOfficeForm />
      </Space>
    </div>
  );
}

export default MapPanel;
