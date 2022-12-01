import { Space } from "antd";

import { useSelector } from "react-redux";

function OfficeName() {
  const selectedName = useSelector((state) => state.selectedName);

  return (
    <>
      <Space>
        <h1 className="office-name">{selectedName}</h1>
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: "normal",
          }}
        >
          ofis planı
        </span>
      </Space>
    </>
  );
}

export default OfficeName;
