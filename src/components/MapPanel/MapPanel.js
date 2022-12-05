import { Button, Space, Tree } from "antd";
import { useDispatch, useSelector } from "react-redux";

import NewOfficeForm from "./NewOfficeForm";

import { addFloor, changeName } from "store/actions/mapActions";
import { findObj } from "map/helpers/findObj";
import { createView } from "map/helpers/createView";

function MapPanel() {
  const dispatch = useDispatch();
  const { treeData, map } = useSelector((state) => state);

  const onSelect = (selectedKeys) => {
    if (selectedKeys[0]?.length === 3) {
      const key = selectedKeys[0];

      const { layerGroup, extent, name } = findObj(treeData, key);
      if (layerGroup) {
        map.getLayers().forEach((layer) => {
          layer.setVisible(false);
        });
        layerGroup.setVisible(true);
        map.setView(createView(extent));
        dispatch(changeName(name));
      }
    }
  };

  return (
    <div className="map-panel">
      <Tree
        showLine={true}
        defaultExpandAll
        onSelect={onSelect}
        treeData={treeData}
      />
      <Space direction="vertical">
        <Button
          type="dashed"
          onClick={() => {
            dispatch(addFloor());
          }}
        >
          Yeni Kat
        </Button>
        <NewOfficeForm />
      </Space>
    </div>
  );
}

export default MapPanel;
