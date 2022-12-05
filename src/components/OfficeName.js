import { Space } from "antd";

import { useSelector } from "react-redux";

function OfficeName() {
  const name = useSelector((state) => state.name);

  return (
    <Space className="office-name">
      <h1>{name}</h1>
      <span>ofis planı</span>
    </Space>
  );
}

export default OfficeName;
