import React from "react";
import { useSelector } from "react-redux";
import { Space } from "antd";

function OfficeName() {
  const selectedName = useSelector((state) => state.selectedName);

  return (
    <>
      <Space>
        <h1 style={{ color: "black" }}>{selectedName}</h1>
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: "normal",
          }}
        >
          office plan
        </span>
      </Space>
    </>
  );
}

export default OfficeName;
