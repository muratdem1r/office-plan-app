import { Space } from "antd";

import useFindBySelectedKey from "map/hooks/useFindBySelectedKey";

import styles from "./OfficeName.module.css";

function OfficeName() {
  const office = useFindBySelectedKey();
  return (
    <Space className={styles.name}>
      <h1>{office?.name}</h1>
      <span>ofis planı</span>
    </Space>
  );
}

export default OfficeName;
