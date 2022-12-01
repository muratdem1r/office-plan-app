import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { selectPlan } from "store/actions/mapActions";

function OfficeName() {
  const dispatch = useDispatch();
  const selectedName = useSelector((state) => state.selectedName);
  const selectedFloor = useSelector((state) => state.selectedFloor);
  const map = useSelector((state) => state.map);

  const onClick = ({ key }) => {
    map?.getLayers().array_.forEach((layerGroup) => {
      const name = layerGroup.get("name");
      const floor = layerGroup.get("floor");
      if (name === key && floor === selectedFloor) {
        dispatch(selectPlan(layerGroup));
      }
    });
  };
  let counter = 0;
  const items = map?.getLayers().array_.map((layerGroup) => {
    const name = layerGroup.get("name");
    const floor = layerGroup.get("floor");

    if (selectedName !== name && floor === selectedFloor) {
      counter++;
      return { label: name, key: name };
    }
  });

  return (
    <>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <h1 style={{ color: "black" }}>{selectedName}</h1>
            <span>{counter > 0 && counter}</span>
            <DownOutlined style={{ color: "black" }} />
          </Space>
        </a>
      </Dropdown>
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: "normal",
          marginLeft: "0.5rem",
        }}
      >
        office plan
      </span>
    </>
  );
}

export default OfficeName;
