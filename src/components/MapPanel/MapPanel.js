import React from "react";

import { Button, Space, Tooltip } from "antd";
import NewOfficeForm from "./NewOfficeForm";
import { useSelector } from "react-redux";

function MapPanel() {
  const selectedFloor = useSelector((state) => state.selectedFloor);

  return (
    <Space direction="vertical">
      <NewOfficeForm defaultFloor={selectedFloor} />
      <Tooltip title="Select a place first.">
        <Button disabled>Add New Employee</Button>
      </Tooltip>
    </Space>
  );
}

export default MapPanel;
