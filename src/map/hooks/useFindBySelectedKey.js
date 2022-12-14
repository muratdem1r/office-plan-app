import { useSelector } from "react-redux";

// Helpers
import { findObj } from "map/helpers/findObj";

function useFindBySelectedKey() {
  const { treeData, selectedOfficeKey } = useSelector((state) => state);

  const result = findObj(treeData, selectedOfficeKey);

  return result;
}

export default useFindBySelectedKey;
