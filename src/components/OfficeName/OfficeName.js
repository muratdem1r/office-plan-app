import { Space } from "antd";

import styles from "./OfficeName.module.css";

// Custom Hooks
import useFindBySelectedKey from "map/hooks/useFindBySelectedKey";

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
