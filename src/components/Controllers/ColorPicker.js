import { Popover, Space, Tooltip } from "antd";

import { RgbaStringColorPicker } from "react-colorful";

function ColorPicker({ color, setColor }) {
  return (
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
  );
}

export default ColorPicker;
